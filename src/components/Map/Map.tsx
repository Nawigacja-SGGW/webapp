import L from 'leaflet';
import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useMapEvents, Polyline } from 'react-leaflet';
import { useLocation } from 'react-router-dom';

import CustomMarker from './CustomMarker';
import InformationPanel from './InformationPanel.tsx';
import NavigationPanel from './NavigationPanel.tsx';
import Warning from './Warning.tsx';
import { SearchPlaces, PathEndChosen } from '../SearchPlaces/SearchPlaces.tsx';
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
  checkNetworkConnection,
  getCurrentLocation,
  checkIfOnCampus,
} from './utils.ts';
import { useAppStore, AppState } from '../../store/index.ts';

import { getObjectsList } from '../../utils';

import '../../leaflet.css';
import './Map.scss';
// import { isObjectLike } from 'lodash';

export type MapNavigationSource = 'objectDetails' | 'objectsOverview';

export type WarningType = 'connection' | 'location' | 'distance' | null;
type WarningInfo = {
  isOnline: boolean;
  isUserLocation: boolean;
  isOnCampus: boolean;
};
const INITIAL_WARNING_INFO: WarningInfo = {
  isOnline: true,
  isUserLocation: true,
  isOnCampus: true,
};

export type Points = {
  startingPoint: L.LatLng | null;
  locationPoint: L.LatLng | null;
  destinationPoint: L.LatLng | null;
};
const INITIAL_POINTS: Points = {
  startingPoint: null,
  locationPoint: null,
  destinationPoint: null,
};
export type Places = {
  startingPlace: PlaceObject | null;
  destinationPlace: PlaceObject | null;
};
const INITIAL_PLACES: Places = {
  startingPlace: null,
  destinationPlace: null,
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
  // Passed via state when navigating (optional, for choosing locations)
  let state = useLocation().state;
  let stateDestination: PlaceObject | null = state?.placeData;
  let statePathEndChosen: PathEndChosen | null = state?.pathEndChosen;
  let statePoints: Points | null = state?.points;
  let statePlaces: Places | null = state?.places;
  let statePlaceId: Number | null = state?.placeId;

  // Warnings for: no network, no location shared, not on campus
  const [warningType, setWarningType] = useState<WarningType>(null);
  const [warningInfo, setWarningInfo] = useState<WarningInfo>(INITIAL_WARNING_INFO);

  // Path information, points on map and chosen places
  const [allLocations, setAllLocations] = useState<PlaceObject[]>([]);
  const [points, setPoints] = useState<Points>(INITIAL_POINTS);
  const pointsRef = useRef<Points>(points);
  const [places, setPlaces] = useState<Places>(INITIAL_PLACES);
  const [pathInfo, setPathInfo] = useState<PathInfo>(INITIAL_PATH_INFO);
  const route_type = useAppStore((state: AppState) => state.preferences.routePreference);

  // State of map, whether we are choosing path or navigating one
  const [mapState, setMapState] = useState<MapState>('browsing');
  const mapStateRef = useRef<MapState>(mapState);

  // Fetch all locations when first loading Map
  useEffect(() => {
    initialRender();
  }, []);

  const initialRender = async () => {
    const allLocations_ = await fetchAllLocations();
    const [places_, points_] = await setInitialConditions(allLocations_);

    console.log(points_);
    console.log(places_);

    setAllLocations(allLocations_);
    setPlaces(places_);
    setPoints(points_);
  };

  const fetchAllLocations = async () => {
    const data = await getObjectsList();

    if (Array.isArray(data)) {
      return data;
    }
    return [];
  };

  const setInitialConditions = async (allLocations_: PlaceObject[]): Promise<[Places, Points]> => {
    console.log(statePathEndChosen);
    if (stateDestination) {
      console.log('came from Details');
      let startingPoint = L.latLng(MAP_CENTER);
      let locationPoint = L.latLng(MAP_CENTER);
      let destinationPoint = new L.LatLng(
        Number(stateDestination.latitude),
        Number(stateDestination.longitude)
      );

      return [
        { startingPlace: null, destinationPlace: stateDestination } as Places,
        {
          startingPoint: startingPoint,
          locationPoint: locationPoint,
          destinationPoint: destinationPoint,
        } as Points,
      ];
    } else if (statePathEndChosen && statePoints && statePlaces && statePlaceId) {
      console.log('came from SearchPlaces');
      let chosenPlace = allLocations_.find((place) => place.id === statePlaceId);

      if (chosenPlace) {
        let chosenPoint = new L.LatLng(Number(chosenPlace.latitude), Number(chosenPlace.longitude));

        return [
          {
            ...statePlaces,
            [statePathEndChosen === 'starting' ? 'startingPlace' : 'destinationPlace']: chosenPlace,
          } as Places,
          {
            ...statePoints,
            [statePathEndChosen === 'starting' ? 'startingPoint' : 'destinationPoint']: chosenPoint,
          } as Points,
        ];
      }
    }

    return [
      { startingPlace: null, destinationPlace: null } as Places,
      {
        startingPoint: L.latLng(MAP_CENTER),
        locationPoint: L.latLng(MAP_CENTER),
        destinationPoint: null,
      } as Points,
    ];
  };

  // Set Interval for updating location
  useEffect(() => {
    const interval = setInterval(() => {
      updateCurrentLocation();
    }, 3000);
    return () => clearInterval(interval);
  }, [points, places, pathInfo, mapState, warningInfo]);

  // Update Path when Points change
  useEffect(() => {
    updatePath();
  }, [points]);

  // Update warning on page bottom
  useEffect(() => {
    if (!warningInfo.isOnline) {
      setWarningType('connection');
    } else if (!warningInfo.isUserLocation) {
      setWarningType('location');
    } else if (!warningInfo.isOnCampus) {
      setWarningType('distance');
    } else {
      setWarningType(null);
    }
  }, [warningInfo]);

  // Update pointsRef and mapStateRef when their state vars change
  useEffect(() => {
    pointsRef.current = { ...points };
  }, [points]);
  useEffect(() => {
    mapStateRef.current = mapState;
  }, [mapState]);

  const updateCurrentLocation = async () => {
    console.log('Updating Location');
    let newInfo: WarningInfo = {
      isOnline: false,
      isUserLocation: false,
      isOnCampus: false,
    };
    let newLocationPoint: L.LatLng | null;

    newInfo.isOnline = await checkNetworkConnection();
    if (newInfo.isOnline) {
      if ((newInfo.isUserLocation = (newLocationPoint = await getCurrentLocation()) !== null)) {
        // For testing, set location in map center when browsing, onMapClick sets it in navigating
        if (mapStateRef.current === 'browsing') {
          newLocationPoint = L.latLng(MAP_CENTER);
        } else if (mapStateRef.current === 'navigating' && pointsRef.current.locationPoint) {
          newLocationPoint = pointsRef.current.locationPoint;
        } else {
          newLocationPoint = L.latLng(MAP_CENTER);
        }

        if ((newInfo.isOnCampus = checkIfOnCampus(newLocationPoint))) {
          if (
            !pointsRef.current.locationPoint ||
            (newLocationPoint.lat === pointsRef.current.locationPoint.lat &&
              newLocationPoint.lng === pointsRef.current.locationPoint.lng)
          ) {
            pointsRef.current.locationPoint = newLocationPoint;
            setPoints((prevPoints) => ({ ...prevPoints, locationPoint: newLocationPoint }));
          }
        }
      }
    }

    if (
      newInfo.isOnline !== warningInfo.isOnline ||
      newInfo.isUserLocation !== warningInfo.isUserLocation ||
      newInfo.isOnCampus !== warningInfo.isOnCampus
    ) {
      setWarningInfo({ ...newInfo });
    }
  };

  const updatePath = () => {
    if (mapStateRef.current === 'navigating' && pathInfo.totalDistance < 5) {
      setMapState('browsing');
      setPoints({
        ...INITIAL_POINTS,
        startingPoint: points.locationPoint,
        locationPoint: points.locationPoint,
      });
      setPlaces({ ...INITIAL_PLACES });
      setPathInfo(INITIAL_PATH_INFO);
    } else if (points.destinationPoint && points.startingPoint && points.locationPoint) {
      getPath(
        mapStateRef.current === 'navigating' ? points.locationPoint : points.startingPoint,
        points.destinationPoint,
        route_type
      ).then((data) => setPathInfo(data));
    } else {
      setPathInfo(INITIAL_PATH_INFO);
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

  function onMarkerClick(markerObject: PlaceObject) {
    if (mapStateRef.current !== 'navigating') {
      setPoints({
        ...points,
        destinationPoint: new L.LatLng(
          Number(markerObject.latitude),
          Number(markerObject.longitude)
        ),
      });
      setPlaces({
        ...places,
        destinationPlace: markerObject,
      });
    }

    return null;
  }

  function OnMapClick() {
    const map_ = useMapEvents({
      click: (event) => {
        if (mapStateRef.current === 'browsing') {
          setPoints({
            ...points,
            [points.locationPoint ? 'destinationPoint' : 'startingPoint']: event.latlng,
          });
          setPlaces({
            ...places,
            [points.locationPoint ? 'destinationPlace' : 'startingPlace']: null,
          });
        }
        // Below part of the function is only for testing, as a measure to see whether navigation works
        // without the need to walk around the campus
        else {
          setPoints({ ...points, locationPoint: event.latlng });
        }

        map_.panTo(event.latlng);
      },
    });

    return null;
  }

  return (
    <div className="map-container">
      {mapState === 'browsing' && allLocations.length !== 0 && (
        <SearchPlaces points={points} places={places} setPoints={setPoints} setPlaces={setPlaces} />
      )}

      {mapState === 'browsing' && places.destinationPlace && (
        <InformationPanel
          place={places.destinationPlace}
          pathDistance={pathInfo.totalDistance}
          pathTime={pathInfo.totalTime}
          isLocationSet={points.locationPoint !== null}
          setMapState={setMapState}
        />
      )}

      {mapState === 'browsing' && !places.destinationPlace && points.destinationPoint && (
        <InformationPanel
          place={null}
          pathDistance={pathInfo.totalDistance}
          pathTime={pathInfo.totalTime}
          isLocationSet={points.locationPoint !== null}
          setMapState={setMapState}
        />
      )}

      {mapState === 'navigating' && pathInfo && (
        <NavigationPanel pathInfo={pathInfo} setMapState={setMapState} />
      )}

      {warningType && <Warning type={warningType} />}

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

        {points.locationPoint && <CustomMarker position={points.locationPoint} isLocation={true} />}

        {points.startingPoint !== null &&
          (!points.locationPoint ||
            points.startingPoint?.lat !== points.locationPoint.lat ||
            points.startingPoint?.lng !== points.locationPoint.lng) && (
            <CustomMarker position={points.startingPoint} />
          )}
        {points.destinationPoint && places.destinationPlace === null && (
          <CustomMarker position={points.destinationPoint} />
        )}

        <Polyline positions={pathInfo.path} />

        <OnMapClick />
      </MapContainer>
    </div>
  );
};

export default Map;
