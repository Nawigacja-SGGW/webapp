import L, { LatLng } from 'leaflet';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import { useMapEvents } from 'react-leaflet';
import CustomMarker from './CustomMarker';
import './leaflet.css';
import './Map.scss';

import { demo_places, Place } from '../../mocks/places.ts';

function OnMapClick() {
  useMapEvents({
    click: (event) => {
      console.log(event.latlng);
    },
  });

  return null;
}

export const Map = ({ places, path }: { places?: Place[]; path?: L.LatLng[] }) => {
  const sw = L.latLng(52.15656, 21.03624);
  const ne = L.latLng(52.1674, 21.05596);

  // const wzimCoords = L.latLng(52.16198, 21.04633);

  // Following lines for testing only
  if (!places) {
    places = demo_places;
  }
  if (!path) {
    path = places.map((place) => new L.LatLng(Number(place.lat), Number(place.lon)));
  }
  // end of lines for testing

  let route: [L.LatLng, L.LatLng][] = [];
  if (path && path.length > 1) {
    // route = path.slice(0, -1).map((_, i) => [path[i], path[i + 1]])
    for (let i = 0; i < path.length - 1; i++) {
      route.push([path[i], path[i + 1]]);
    }
  }

  return (
    <div className="map-container">
      <MapContainer
        center={[52.16256, 21.04219]}
        //maxBounds={L.latLngBounds(sw, ne)}
        maxBoundsViscosity={1}
        zoom={16}
        //minZoom={16}
        maxZoom={18}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {places?.map((place, index) => (
          <CustomMarker
            key={index}
            position={L.latLng(Number(place.lat), Number(place.lon))}
            text={place.name + ' - ' + place.description}
          />
        ))}

        <Polyline positions={route} />

        <OnMapClick />
      </MapContainer>
    </div>
  );
};

export default Map;
