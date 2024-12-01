import L, { LeafletMouseEventHandlerFn } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { ObjectData } from '../../models';

const markerIcon = new L.Icon({
  iconUrl: '../../../public/marker-icon.png',
  iconRetinaUrl: '../../../public/marker-icon-2x.png',
  shadowUrl: '../../../public/marker-shadow.png',
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
}) => {
  return <Marker position={position} icon={markerIcon} eventHandlers={{ click: onClick }} />;
};

export default CustomMarker;
