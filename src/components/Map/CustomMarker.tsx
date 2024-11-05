import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';

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
  text,
}: {
  position: L.LatLngExpression;
  text: string | undefined;
}) => {
  return (
    <Marker position={position} icon={markerIcon}>
      {text && <Popup>{text}</Popup>}
    </Marker>
  );
};

export default CustomMarker;
