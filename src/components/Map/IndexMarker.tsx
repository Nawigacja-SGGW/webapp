import { divIcon } from 'leaflet';
import { Marker } from 'react-leaflet';
import './IndexMarker.scss';

export const IndexMarker = ({
  position,
  index,
}: {
  position: L.LatLngExpression;
  index: number;
}) => {
  const indexIcon = divIcon({ html: `<div class="index-marker"><p>${index}</p?</div>` });

  return <Marker position={position} icon={indexIcon} />;
};
