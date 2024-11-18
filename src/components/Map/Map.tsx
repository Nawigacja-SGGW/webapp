import L from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useMapEvents, Polyline } from 'react-leaflet';
import CustomMarker from './CustomMarker';
import { SearchPlaces } from '../SearchPlaces/SearchPlaces.tsx';
import './leaflet.css';
import './Map.scss';
import { useEffect, useState } from 'react';
import { ObjectData } from '../../models';
import { getPath } from './utils.ts';

function OnMapClick() {
  useMapEvents({
    click: (event) => {
      console.log(event.latlng);
    },
  });

  return null;
}

export const Map = () => {
  const [points, setPoints] = useState<{
    startPoint: ObjectData;
    destinationPoint: ObjectData;
  }>();
  const [road, setRoad] = useState<[L.LatLng, L.LatLng][]>([]);
  const sw = L.latLng(52.15656, 21.03624);
  const ne = L.latLng(52.1674, 21.05596);

  const wzimCoords = L.latLng(52.16198, 21.04633);

  useEffect(() => {
    if (points?.startPoint && points?.destinationPoint)
      getPath(
        {
          lat: points?.startPoint.lat,
          lng: points?.startPoint.lng,
        } as L.LatLng,
        {
          lat: points?.destinationPoint.lat,
          lng: points?.destinationPoint.lng,
        } as L.LatLng,
        'foot'
      ).then((data) => setRoad(data));
  }, [points]);

  const startCoords = [points?.startPoint.lat, points?.startPoint.lng] as L.LatLngExpression;
  const destCoords = [
    points?.destinationPoint.lat,
    points?.destinationPoint.lng,
  ] as L.LatLngExpression;

  return (
    <div className="map-container">
      <SearchPlaces onSetPoints={setPoints} />
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
        {!(points?.startPoint && points?.destinationPoint) && (
          <CustomMarker position={wzimCoords} text={'WZIM'} />
        )}
        {points?.startPoint && (
          <CustomMarker position={startCoords} text={points?.startPoint.name} />
        )}
        {points?.destinationPoint && (
          <CustomMarker position={destCoords} text={points?.destinationPoint.name} />
        )}
        <Polyline positions={road} />
        <OnMapClick />
      </MapContainer>
    </div>
  );
};

export default Map;
