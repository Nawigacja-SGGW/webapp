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
import { useAppStore, AppState } from '../../store/index.ts';
import { IndexMarker } from '../../components/Map/IndexMarker.tsx';

export const GuidePage = () => {
  const route_type = useAppStore((state: AppState) => state.preferences.routePreference);

  const [pathsInfos, setPathsInfo] = useState<PathInfo[]>([]);
  const testMakerPosition = L.latLng(52.16256, 21.04222);

  const destinatonPoints: L.LatLng[] = [
    L.latLng(52.162, 21.046319957149112),
    L.latLng(52.1600272, 21.044767625367818),
    L.latLng(52.16256, 21.04222),
  ];

  useEffect(() => {
    getPaths(destinatonPoints, route_type).then((data) => setPathsInfo(data));
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
        {pathsInfos.map((pathInfo) => (
          <Polyline positions={pathInfo.path} />
        ))}

        {destinatonPoints.map((destinationPoint, i) => (
          <IndexMarker position={destinationPoint} index={i + 1} />
        ))}
      </MapContainer>
    </div>
  );
};
