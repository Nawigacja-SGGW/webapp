import L from 'leaflet';
import { MapContainer, Polyline, TileLayer } from 'react-leaflet';
// import { Polyline } from 'react-leaflet';

// import CustomMarker from './CustomMarker';

// import './leaflet.css';
// import './Map.scss';

import '../../leaflet.css';
import {
  BORDER_NE,
  BORDER_SW,
  MAP_CENTER,
  MAP_MAX_BOUNDS_VISCOSITY,
  MAP_MAX_ZOOM,
  MAP_MIN_ZOOM,
  MAP_ZOOM,
  PathInfo,
} from '../../components/Map/utils';
import { useState } from 'react';

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

  const [pathInfo, setPathInfo] = useState<PathInfo>(INITIAL_PATH_INFO);

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
        <Polyline positions={pathInfo.path} />
      </MapContainer>
    </div>
  );
};
