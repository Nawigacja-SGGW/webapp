import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './leaflet.css';
import './Map.scss';

const markerIcon = new L.Icon({
  iconUrl: '../../../public/marker-icon.png',
  iconRetinaUrl: '../../../public/marker-icon-2x.png',
  shadowUrl: '../../../public/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -24],
  shadowSize: [41, 41],
});

export const Map = () => {
  const sw = L.latLng(52.15656, 21.03624);
  const ne = L.latLng(52.1674, 21.05596);

  const wzimCoords = L.latLng(52.16198, 21.04633);

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

        <Marker position={wzimCoords} icon={markerIcon}>
          <Popup>WZIM</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
