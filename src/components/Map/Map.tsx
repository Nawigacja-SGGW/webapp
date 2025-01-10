import L from 'leaflet';
import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useMap, useMapEvents, Polyline } from 'react-leaflet';
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
  const state = useLocation().state;
  const stateDestination: PlaceObject | null = state?.placeData;
  const statePathEndChosen: PathEndChosen | null = state?.pathEndChosen;
  const statePoints: Points | null = state?.points;
  const statePlaces: Places | null = state?.places;
  const statePlaceId: Number | null = state?.placeId;

  // Warnings for: no network, no location shared, not on campus
  const [warningType, setWarningType] = useState<WarningType>(null);
  const [warningInfo, setWarningInfo] = useState<WarningInfo>(INITIAL_WARNING_INFO);

  // Path information, points on map and chosen places
  const [allLocations, setAllLocations] = useState<PlaceObject[]>([]);
  const [points, setPoints] = useState<Points>(INITIAL_POINTS);
  const pointsRef = useRef(points);
  const [places, setPlaces] = useState<Places>(INITIAL_PLACES);
  const [pathInfo, setPathInfo] = useState<PathInfo>(INITIAL_PATH_INFO);
  const route_type = useAppStore((state: AppState) => state.preferences.routePreference);

  // State of map, whether we are choosing path or navigating one
  const [mapState, setMapState] = useState<MapState>('browsing');

  // Fetch all locations when first loading Map
  useEffect(() => {
    console.log('Map loaded');
    initialUpdateToWarningsLocationAndAllLocations();
  }, []);

  // Interval for checking the state (warnings)
  useEffect(() => {
    const interval = setInterval(() => {
      updateLocationAndWarnings();
    }, 10000); // For now set as every 10 seconds (possibly temporary, idk)

    return () => clearInterval(interval);
  }, [warningInfo]);

  // After all locations set, get all state variables
  useEffect(() => {
    // If came from ObjectDetails, set object as destination
    if (stateDestination && statePoints && points.locationPoint) {
      console.log('Came from ObjectDetails');
      setPoints({
        ...statePoints,
        startingPoint: new L.LatLng(points.locationPoint.lat, points.locationPoint.lng),
        destinationPoint: new L.LatLng(
          Number(stateDestination.latitude),
          Number(stateDestination.longitude)
        ),
      });
      setPlaces({ startingPlace: null, destinationPlace: stateDestination });
    }
    // If came from ObjectsOverview (there from SearchPlaces), set start or destination
    else if (statePathEndChosen && statePoints && statePlaces && statePlaceId) {
      console.log('Came from ObjectsOverview');
      let chosenPlace: PlaceObject | undefined = allLocations.find(
        (place) => place.id === statePlaceId
      );

      if (chosenPlace) {
        if (statePathEndChosen == 'starting') {
          setPlaces({ ...statePlaces, startingPlace: chosenPlace });
          setPoints({
            ...statePoints,
            startingPoint: new L.LatLng(
              Number(chosenPlace.latitude),
              Number(chosenPlace.longitude)
            ),
          });
        } else if (statePathEndChosen == 'destination') {
          setPlaces({ ...statePlaces, destinationPlace: chosenPlace });
          setPoints({
            ...statePoints,
            destinationPoint: new L.LatLng(
              Number(chosenPlace.latitude),
              Number(chosenPlace.longitude)
            ),
          });
        }
      }
    }
    // If came here other way
    else {
      console.log('Came from other location');
      setPlaces({ startingPlace: null, destinationPlace: null });
      setPoints({ ...points, startingPoint: points.locationPoint, destinationPoint: null });
    }
  }, [allLocations]);

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

  // Update pointsRef when points change
  useEffect(() => {
    console.log('Update pointsRef');
    pointsRef.current = points;
    console.log(pointsRef.current.startingPoint);
    console.log(pointsRef.current.locationPoint);
    console.log(pointsRef.current.destinationPoint);
  }, [points]);

  // Update path (and path info) when points changes
  useEffect(() => {
    console.log('Update path');

    // Canceling navigation when too close to destination
    if (mapState === 'navigating' && pathInfo.totalDistance < 5) {
      setMapState('browsing');
      setPoints(INITIAL_POINTS);
      setPathInfo(INITIAL_PATH_INFO);
    } else if (points?.destinationPoint && points.startingPoint && points.locationPoint) {
      getPath(points.startingPoint, points.destinationPoint, route_type).then((data) =>
        setPathInfo(data)
      );
    } else {
      setPathInfo(INITIAL_PATH_INFO);
    }
  }, [points]);

  const initialUpdateToWarningsLocationAndAllLocations = async () => {
    await updateLocationAndWarnings();

    getObjectsList().then((data) => {
      if (Array.isArray(data)) {
        setAllLocations(data);
      }
    });
  };

  const updateLocationAndWarnings = async () => {
    console.log('Perform check');
    let newInfo: WarningInfo = {
      isOnline: false,
      isUserLocation: false,
      isOnCampus: false,
    };

    if (navigator.onLine) {
      try {
        await fetch('https://www.google.com/generate_204', {
          mode: 'no-cors',
          cache: 'no-store',
        }).then(() => {
          newInfo.isOnline = true;
        });
      } catch (error) {
        newInfo.isOnline = false;
      }
    }

    if (navigator.geolocation) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        // This check is only for testing (mapState check)
        // When in production, it should update with correct current location, no matter which state we're in
        // But for testing purposes, when in browsing, we set Location as in center of the map (see comments above)
        // Also when in Navigating, clicking on map changes location, but in production it won't do anything
        // It's so that testing without walking around campus can be performed, and showing it to chief when she'll be checking it
        if (mapState === 'browsing') {
          let newLocationPoint = L.latLng(MAP_CENTER); // Temporary only, for production swap with commented line below
          // let newLocationPoint = new L.LatLng(position.coords.latitude, position.coords.longitude);

          newInfo.isUserLocation = true;
          newInfo.isOnCampus = checkIfOnCampus(newLocationPoint);

          // Moved to pointsRef, as points didn't have correct value in interval
          if (!pointsRef.current.locationPoint?.equals(newLocationPoint)) {
            console.log('- location changed');
            setPoints({ ...points, locationPoint: newLocationPoint });
          }
        } else {
          // This also just for testing, when in navigating, treat location always as correct
          newInfo.isUserLocation = true;
          newInfo.isOnCampus = true;
        }
      } catch (error) {
        newInfo.isUserLocation = false;
        newInfo.isOnCampus = false;
      }
    }

    // Only update when something changed
    if (
      newInfo.isOnline !== warningInfo.isOnline ||
      newInfo.isUserLocation !== warningInfo.isUserLocation ||
      newInfo.isOnCampus !== warningInfo.isOnCampus
    ) {
      setWarningInfo({
        isOnline: newInfo.isOnline,
        isUserLocation: newInfo.isUserLocation,
        isOnCampus: newInfo.isOnCampus,
      });
    }
  };

  // Function to check if user location is within campus
  // It's just checking whether they're inside boundaries
  const checkIfOnCampus = (location: L.LatLng | null) => {
    if (!location || location.lat < 0 || location.lng < 0) {
      return false;
    }

    let latOnCampus = location.lat >= BORDER_SW.lat && location.lat <= BORDER_NE.lat;
    let lngOnCampus = location.lng >= BORDER_SW.lng && location.lng <= BORDER_NE.lng;

    return latOnCampus && lngOnCampus;
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
  function onMarkerClick(markerObject: PlaceObject) {
    if (mapState !== 'navigating') {
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

  // Setting destination when starting is set, otherwise set starting
  function OnMapClick() {
    const map = useMapEvents({
      click: (event) => {
        if (mapState === 'browsing') {
          if (points.locationPoint) {
            setPoints({ ...points, destinationPoint: event.latlng });
            setPlaces({ ...places, destinationPlace: null });
          } else {
            setPoints({ ...points, startingPoint: event.latlng });
            setPlaces({ ...places, startingPlace: null });
          }
        }
        // Below part of the function is only for testing, as a measure to see whether navigation works
        // without the need to walk around the campus
        else {
          setPoints({ ...points, locationPoint: event.latlng });
        }

        map.panTo(event.latlng);
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

        {points.locationPoint && <CustomMarker position={points.locationPoint} />}
        {points.destinationPoint && <CustomMarker position={points.destinationPoint} />}

        <Polyline positions={pathInfo.path} />

        <OnMapClick />
      </MapContainer>
    </div>
  );
};

export default Map;
