import L from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useMapEvents, Polyline } from 'react-leaflet';

import CustomMarker from './CustomMarker';
import InformationPanel from './InformationPanel.tsx';
import NavigationPanel from './NavigationPanel.tsx';
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

export type Points = {
  startingPoint: PlaceObject | null;
  locationCoords: L.LatLng | null;
  destinationPoint: PlaceObject | null;
};

export type MapState = 'browsing' | 'navigating';

const INITIAL_POINTS: Points = {
  startingPoint: null,
  locationCoords: null,
  destinationPoint: null,
};

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
  // const [points, setPoints] = useState(INITIAL_POINTS);
  // const [pathInfo, setPathInfo] = useState<PathInfo>(INITIAL_PATH_INFO);

  // const [mapState, setMapState] = useState<MapState>('browsing');
  // const [allLocations, setAllLocations] = useState<PlaceObject[]>([]);

  // const route_type = useAppStore((state: AppState) => state.preferences.routePreference);

  // // Fetch all objects
  // // when first loading Map
  // useEffect(() => {
  //   getObjectsList().then((data) => {
  //     if (Array.isArray(data)) {
  //       setAllLocations(data);
  //     }
  //   });
  // }, []);

  // // Update path (and path info)
  // // when points changes
  // useEffect(() => {
  //   // Canceling navigation when too close to destination
  //   if (mapState === 'navigating' && pathInfo.totalDistance < 5) {
  //     setMapState('browsing');
  //     setPoints(INITIAL_POINTS);
  //     setPathInfo(INITIAL_PATH_INFO);
  //   } else if (points?.destinationPoint && (points.startingPoint || points.locationCoords)) {
  //     let startingPoint: L.LatLng | undefined;
  //     let destinationPoint: L.LatLng = {
  //       lat: Number(points.destinationPoint.latitude),
  //       lng: Number(points.destinationPoint.longitude),
  //     } as L.LatLng;

  //     if (points.startingPoint) {
  //       startingPoint = {
  //         lat: Number(points.startingPoint.latitude),
  //         lng: Number(points.startingPoint.longitude),
  //       } as L.LatLng;
  //     } else if (points.locationCoords) {
  //       startingPoint = points.locationCoords;
  //     }

  //     if (startingPoint) {
  //       getPath(startingPoint, destinationPoint, route_type).then((data) => setPathInfo(data));
  //     }
  //   } else {
  //     setPathInfo(INITIAL_PATH_INFO);
  //   }
  // }, [points]);

  // // useEffect(() => {
  // //   if (mapState === 'navigating') {
  // //     // Below solution when using real location (update on a timer, could add if location changed enough)
  // //     const interval = setInterval(() => {
  // //       getPath(
  // //         {
  // //           lat: points.locationPoint!.lat,
  // //           lng: points.locationPoint!.lng,
  // //         } as L.LatLng,
  // //         {
  // //           lat: points.destinationObject!.lat,
  // //           lng: points.destinationObject!.lng,
  // //         } as L.LatLng,
  // //         'foot'
  // //       ).then((data) => setPathInfo(data));
  // //     }, 1000);
  // //     return () => clearInterval(interval);
  // //   }
  // // }, []);

  // const PopulateWithMarkers = () => {
  //   return Array.isArray(allLocations)
  //     ? allLocations.map((location, i) => (
  //         <CustomMarker
  //           position={L.latLng(Number(location.latitude), Number(location.longitude))}
  //           onClick={() => OnMarkerClick(location)}
  //           key={i}
  //         />
  //       ))
  //     : null;
  // };

  // // Setting clicked marker's object as destination
  // const OnMarkerClick = (markerObject: PlaceObject) => {
  //   if (mapState !== 'navigating') {
  //     setPoints({
  //       ...points,
  //       destinationPoint: markerObject,
  //     });
  //   }
  // };

  // // Setting location when clicked on map (not marker)
  // function OnMapClick() {
  //   useMapEvents({
  //     click: (event) => {
  //       setPoints({
  //         ...points,
  //         locationCoords: event.latlng,
  //         startingPoint: null,
  //       });
  //     },
  //   });
  //   return null;
  // }

  return (
    <div className="map-container">
      {/* {mapState === 'browsing' && allLocations.length !== 0 && (
        <SearchPlaces points={points} onSetPoints={setPoints} allLocations={allLocations} />
      )}

      {mapState === 'browsing' && points.destinationPoint && (
        <InformationPanel
          place={points.destinationPoint}
          pathDistance={pathInfo.totalDistance}
          pathTime={pathInfo.totalTime}
          isLocationSet={points.locationCoords !== null}
          setMapState={setMapState}
        />
      )}

      {mapState === 'navigating' && pathInfo && (
        <NavigationPanel pathInfo={pathInfo} setMapState={setMapState} />
      )} */}

      {/* <MapContainer
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

        {allLocations && PopulateWithMarkers()}

        {points.locationCoords && <CustomMarker position={points.locationCoords} />}

        <Polyline positions={pathInfo.path} />

        <OnMapClick />
      </MapContainer> */}
    </div>
  );
};

export default Map;
