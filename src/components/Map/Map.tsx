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

type Points = {
  locationPoint: L.LatLng | null;
  destinationPoint: ObjectData | null;
};

const BORDER_SW = L.latLng(52.1524, 21.0354);
const BORDER_NE = L.latLng(52.1704, 21.0554);
// const WZIM_COORDS = L.latLng(52.16198, 21.04633);

const INITIAL_POINTS: Points = {
  locationPoint: null,
  destinationPoint: null,
};

export const Map = () => {
  const [points, setPoints] = useState(INITIAL_POINTS);
  const [path, setPath] = useState<[L.LatLng, L.LatLng][]>([]);

  // getting all locations from handlers.ts                   (check getObjectList)
  const [allLocations, setAllLocations] = useState<ObjectData[]>([]);
  useEffect(() => {
    getObjectsList().then((data) => {
      setAllLocations(data);
    });
  }, []);

  // fetching path from server                                 maybe change to use axios
  useEffect(() => {
    if (points?.locationPoint && points?.destinationPoint)
      getPath(
        {
          lat: points?.locationPoint.lat,
          lng: points?.locationPoint.lng,
        } as L.LatLng,
        {
          lat: points?.destinationPoint.lat,
          lng: points?.destinationPoint.lng,
        } as L.LatLng,
        'foot'
      ).then((data) => setPath(data));
  }, [points]);

  // const locationCoords = [points?.locationPoint.lat, points?.locationPoint.lng] as L.LatLngExpression;
  // const destinationCoords = [
  //   points?.destinationPoint.lat,
  //   points?.destinationPoint.lng,
  // ] as L.LatLngExpression;

  const PopulateWithMarkers = () => {
    return allLocations.map((location, i) => (
      <CustomMarker
        position={L.latLng(location.lat, location.lng)}
        onClick={() => OnMarkerClick(location)}
        key={i}
      />
    ));
  };

  const OnMarkerClick = (markerObject: ObjectData) => {
    setPoints({
      ...points,
      destinationPoint: markerObject,
    });
  };

  function OnMapClick() {
    useMapEvents({
      click: (event) => {
        setPoints({
          ...points,
          locationPoint: event.latlng,
        });
      },
    });
    return null;
  }

  return (
    <div className="map-container">
      {allLocations.length !== 0 && (
        <SearchPlaces points={points} onSetPoints={setPoints} allLocations={allLocations} />
      )}

      {points.destinationPoint && <InformationPanel data={points.destinationPoint} />}

      <MapContainer
        center={[52.16256, 21.04219]}
        maxBounds={L.latLngBounds(BORDER_SW, BORDER_NE)}
        maxBoundsViscosity={1}
        zoom={16}
        minZoom={16}
        maxZoom={18}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {allLocations && PopulateWithMarkers()}

        <Polyline positions={path} />

        {points.locationPoint && <CustomMarker position={points.locationPoint} />}

        <OnMapClick />
      </MapContainer>
    </div>
  );
};

export default Map;
