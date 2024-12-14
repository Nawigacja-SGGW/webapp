import L from 'leaflet';
import { MapContainer, Polyline, TileLayer } from 'react-leaflet';
import '../../leaflet.css';
import {
  BORDER_NE,
  BORDER_SW,
  getPaths,
  MAP_CENTER,
  MAP_MAX_BOUNDS_VISCOSITY,
  MAP_MAX_ZOOM,
  MAP_MIN_ZOOM,
  MAP_ZOOM,
  PathInfo,
} from '../../components/Map/utils';
import { useEffect, useState } from 'react';

export const GuidePage = () => {
  const INITIAL_PATH_INFO: PathInfo = {
    path: [],
    totalTime: 0,
    totalDistance: 0,
    transportationMode: '',
    nextManeuver: '',
    nextManeuverModifier: '',
    distanceUntillNextDirection: 0,
  };

  //21.044767625367818,52.1600272;21.046319957149112,52.162

  const [pathInfo1, setPathInfo1] = useState<PathInfo>(INITIAL_PATH_INFO);
  const [pathInfo2, setPathInfo2] = useState<PathInfo>(INITIAL_PATH_INFO);

  const destinatonPoints: L.LatLng[] = [
    L.latLng(52.162, 21.046319957149112),
    L.latLng(52.1600272, 21.044767625367818),
    L.latLng(52.16256, 21.04222),
  ];

  useEffect(() => {
    getPaths(destinatonPoints, 'foot').then((data) => {
      console.log('\n\n\n');
      console.log(data);
      console.log('\n\n\n');

      setPathInfo1(data[0]);
      setPathInfo2(data[1]);
    });
  }, []);

  return (
    <div className="map-container">
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
        <Polyline positions={pathInfo1.path} />
        <Polyline pathOptions={{ color: 'red' }} positions={pathInfo2.path} />
      </MapContainer>
    </div>
  );
};
