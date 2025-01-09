import L from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useMapEvents, Polyline } from 'react-leaflet';

import CustomMarker from './CustomMarker';
import InformationPanel from './InformationPanel.tsx';
import NavigationPanel from './NavigationPanel.tsx';
import Warning from './Warning.tsx';
import { SearchPlaces } from '../SearchPlaces/SearchPlaces.tsx';
import { PlaceObject } from '../../common/model.ts';
import {
  BORDER_NE,
  BORDER_SW,
  getPath,
  MAP_CENTER,
  MAP_MAX_BOUNDS_VISCOSITY,
  MAP_MAX_ZOOM,
  MAP_MIN_ZOOM,
  MAP_ZOOM,
  PathInfo,
} from './utils.ts';
import { useAppStore, AppState } from '../../store/index.ts';

import { getObjectsList } from '../../utils';

import '../../leaflet.css';
import './Map.scss';
import { isObjectLike } from 'lodash';

export type WarningType = 'connection' | 'location' | 'distance' | null;
type WarningInfo = {
  isOnline: boolean;
  isUserLocation: boolean;
  isOnCampus: boolean;
};
const INITIAL_WARNING_INFO: WarningInfo = {
  isOnline: false,
  isUserLocation: false,
  isOnCampus: false,
};

export type Points = {
  startingPoint: L.LatLng | null;
  locationCoords: L.LatLng | null;
  destinationPoint: L.LatLng | null;
};
const INITIAL_POINTS: Points = {
  startingPoint: null,
  locationCoords: null,
  destinationPoint: null,
};

export type MapState = 'browsing' | 'navigating';

const INITIAL_PATH_INFO: PathInfo = {
  path: [],
  totalTime: 0,
  totalDistance: 0,
  transportationMode: '',
  nextManeuver: '',
  nextManeuverModifier: '',
  distanceUntillNextDirection: 0,
};

export const Map = () => {
  const [warningType, setWarningType] = useState<WarningType>(null);
  const [warningInfo, setWarningInfo] = useState<WarningInfo>(INITIAL_WARNING_INFO);

  const [points, setPoints] = useState<Points>(INITIAL_POINTS);
  const [startingPlace, setStartingPlace] = useState<PlaceObject | null>(null);
  const [destinationPlace, setDestinationPlace] = useState<PlaceObject | null>(null);
  const [pathInfo, setPathInfo] = useState<PathInfo>(INITIAL_PATH_INFO);

  const [mapState, setMapState] = useState<MapState>('browsing');
  const [allLocations, setAllLocations] = useState<PlaceObject[]>([]);

  const route_type = useAppStore((state: AppState) => state.preferences.routePreference);

  // Fetch all objects
  // when first loading Map
  useEffect(() => {
    getObjectsList().then((data) => {
      if (Array.isArray(data)) {
        setAllLocations(data);
      }
    });

    setWarningInfo({ ...warningInfo, isOnline: navigator.onLine });
    getUserLocation();
  }, []);

  // Update warning on page bottom
  useEffect(() => {
    if (!warningInfo.isOnline) {
      setWarningType('connection');
    } else if (!warningInfo.isUserLocation) {
      setWarningType('location');
    } else if (!warningInfo.isOnCampus) {
      setWarningType('distance');
    }
  }, [setWarningInfo]);

  // Update path (and path info)
  // when points changes
  useEffect(() => {
    // Canceling navigation when too close to destination
    if (mapState === 'navigating' && pathInfo.totalDistance < 5) {
      setMapState('browsing');
      setPoints(INITIAL_POINTS);
      setPathInfo(INITIAL_PATH_INFO);
    } else if (points?.destinationPoint && (points.startingPoint || points.locationCoords)) {
      let startingPoint: L.LatLng | undefined;
      let destinationPoint: L.LatLng = {
        lat: Number(points.destinationPoint.lat),
        lng: Number(points.destinationPoint.lng),
      } as L.LatLng;

      if (points.startingPoint) {
        startingPoint = {
          lat: Number(points.startingPoint.lat),
          lng: Number(points.startingPoint.lng),
        } as L.LatLng;
      } else if (points.locationCoords) {
        startingPoint = points.locationCoords;
      }

      if (startingPoint) {
        getPath(startingPoint, destinationPoint, route_type).then((data) => setPathInfo(data));
      }
    } else {
      setPathInfo(INITIAL_PATH_INFO);
    }
  }, [points]);

  // useEffect(() => {
  //   if (mapState === 'navigating') {
  //     // Below solution when using real location (update on a timer, could add if location changed enough)
  //     const interval = setInterval(() => {
  //       getPath(
  //         {
  //           lat: points.locationPoint!.lat,
  //           lng: points.locationPoint!.lng,
  //         } as L.LatLng,
  //         {
  //           lat: points.destinationObject!.lat,
  //           lng: points.destinationObject!.lng,
  //         } as L.LatLng,
  //         'foot'
  //       ).then((data) => setPathInfo(data));
  //     }, 1000);
  //     return () => clearInterval(interval);
  //   }
  // }, []);

  const checkIfOnCampus = (point: L.LatLng | null) => {
    if (!point || point.lat < 0 || point.lng < 0) {
      return false;
    }

    var latOnCampus = point.lat >= BORDER_SW.lat && point.lat <= BORDER_NE.lat;
    var lngOnCampus = point.lng >= BORDER_SW.lng && point.lat <= BORDER_NE.lng;

    return latOnCampus && lngOnCampus;
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setWarningInfo({ ...warningInfo, isUserLocation: true });
          setPoints({
            ...points,
            locationCoords: new L.LatLng(position.coords.latitude, position.coords.longitude),
          });
          setWarningInfo({ ...warningInfo, isOnCampus: checkIfOnCampus(points.locationCoords) });
        },
        (_error) => {
          setWarningInfo({ ...warningInfo, isUserLocation: false });
        }
      );
    } else {
      setWarningInfo({ ...warningInfo, isUserLocation: false });
    }
  };

  const populateWithMarkers = () => {
    return Array.isArray(allLocations) && allLocations.length > 0
      ? allLocations.map((location, i) => (
          <CustomMarker
            position={L.latLng(
              parseFloat(location.latitude) || BORDER_SW.lat,
              parseFloat(location.longitude) || BORDER_SW.lng
            )}
            onClick={() => onMarkerClick(location)}
            key={i}
          />
        ))
      : null;
  };

  // Setting clicked marker's object as destination
  const onMarkerClick = (markerObject: PlaceObject) => {
    if (mapState !== 'navigating') {
      setPoints({
        ...points,
        destinationPoint: new L.LatLng(
          Number(markerObject.latitude),
          Number(markerObject.longitude)
        ),
      });
    }
  };

  // Setting location when clicked on map (not marker)
  function OnMapClick() {
    useMapEvents({
      click: (event) => {
        setPoints({
          ...points,
          locationCoords: event.latlng,
          startingPoint: null,
        });
      },
    });
    return null;
  }

  return (
    <div className="map-container">
      {mapState === 'browsing' && allLocations.length !== 0 && (
        <SearchPlaces points={points} onSetPoints={setPoints} allLocations={allLocations} />
      )}

      {mapState === 'browsing' && destinationPlace && (
        <InformationPanel
          place={destinationPlace}
          pathDistance={pathInfo.totalDistance}
          pathTime={pathInfo.totalTime}
          isLocationSet={points.locationCoords !== null}
          setMapState={setMapState}
        />
      )}

      {mapState === 'navigating' && pathInfo && (
        <NavigationPanel pathInfo={pathInfo} setMapState={setMapState} />
      )}

      <MapContainer
        center={MAP_CENTER}
        maxBounds={L.latLngBounds(BORDER_SW, BORDER_NE)}
        maxBoundsViscosity={MAP_MAX_BOUNDS_VISCOSITY}
        zoom={MAP_ZOOM}
        minZoom={MAP_MIN_ZOOM}
        maxZoom={MAP_MAX_ZOOM}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {allLocations && populateWithMarkers()}

        {points.locationCoords && <CustomMarker position={points.locationCoords} />}

        {warningType && <Warning type={warningType} />}

        <Polyline positions={pathInfo.path} />

        <OnMapClick />
      </MapContainer>
    </div>
  );
};

export default Map;
