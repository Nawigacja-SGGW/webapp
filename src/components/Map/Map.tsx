import axios from 'axios';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useMapEvents, Polyline } from 'react-leaflet';

import CustomMarker from './CustomMarker';
import InformationPanel from './InformationPanel.tsx';
import { SearchPlaces, getObjectsList } from '../SearchPlaces/SearchPlaces.tsx';
import { ObjectData } from '../../models';
import { getPath } from './utils.ts';

import './leaflet.css';
import './Map.scss';

export const Map = () => {
  const [points, setPoints] = useState<{
    startPoint: ObjectData;
    destinationPoint: ObjectData;
  }>();
  const [road, setRoad] = useState<[L.LatLng, L.LatLng][]>([]);
  const sw = L.latLng(52.1524, 21.0354);
  const ne = L.latLng(52.1704, 21.0554);

  const wzimCoords = L.latLng(52.16198, 21.04633);

  // following lines temporary
  const [clickedMarker, setClickedMarker] = useState<ObjectData | undefined>();
  const [allLocations, setAllLocations] = useState<ObjectData[]>([]);
  useEffect(() => {
    getObjectsList().then((data) => {
      setAllLocations(data);
    }); // maybe this passed down to SearchPlaces, then just filtering the list
  }, []);

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

  const OnMarkerClick = (location: ObjectData) => {
    setClickedMarker(location);
  };

  return (
    <div className="map-container">
      <SearchPlaces onSetPoints={setPoints} />
      {clickedMarker && <InformationPanel data={clickedMarker} />}
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
        {allLocations &&
          allLocations.map((location, i) => (
            <CustomMarker
              position={L.latLng(location.lat, location.lng)}
              onClick={() => OnMarkerClick(location)}
              key={i}
            ></CustomMarker>
          ))}
        {/* {points?.startPoint && (
          <CustomMarker position={startCoords} text={points?.startPoint.name} />
        )}
        {points?.destinationPoint && (
          <CustomMarker position={destCoords} text={points?.destinationPoint.name} />
        )} */}
        <Polyline positions={road} />
      </MapContainer>
    </div>
  );
};

export default Map;
