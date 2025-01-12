import L, { LeafletMouseEventHandlerFn } from 'leaflet';
import { Marker } from 'react-leaflet';

const markerIcon = new L.Icon({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -24],
  shadowSize: [41, 41],
});

export const CustomMarker = ({
  position,
  onClick,
}: {
  position: L.LatLngExpression;
  onClick?: LeafletMouseEventHandlerFn;
  text?: string;
}) => {
  return <Marker position={position} icon={markerIcon} eventHandlers={{ click: onClick }} />;
};

export default CustomMarker;
