import L from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import './leaflet.css';
import './Map.scss';

export const Map = () => {
  const sw = L.latLng(52.15656, 21.03624);
  const ne = L.latLng(52.1674, 21.05596);

  return (
    <div className="map-container">
      <MapContainer
        center={[52.16256, 21.04219]}
        maxBounds={L.latLngBounds(sw, ne)}
        maxBoundsViscosity={1}
        zoom={16}
        minZoom={16}
        maxZoom={18}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
};

export default Map;
