import L from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useMapEvents, Polyline } from 'react-leaflet';
import CustomMarker from './CustomMarker';
import { SearchPlaces } from '../SearchPlaces/SearchPlaces.tsx';
import './leaflet.css';
import './Map.scss';
import { useEffect, useState } from 'react';
import { ObjectData } from '../../models';

function OnMapClick() {
  useMapEvents({
    click: (event) => {
      console.log(event.latlng);
    },
  });

  return null;
}

async function getPath(
  location: L.LatLng,
  destination: L.LatLng,
  type: 'foot' | 'bike'
): Promise<[L.LatLng, L.LatLng][]> {
  const newRoute: [L.LatLng, L.LatLng][] = [];
  const routePoints: L.LatLng[] = [];

  // I would suggest maybe placing the logic inside useEffect, using state change setRoute and updating it when location or destination change
  // useEffect(() => {
  //   if (location && destination) { logic }
  // }, [location, destination])
  // and placing route on the map via:
  // const [route, setRoute] = useState<[L.LatLng, L.LatLng][]>([])
  // <MapContainer>
  //   {route.length > 0 && <Polyline positions={route}/>}
  // </MapContainer>

  fetch(
    `https://routing.openstreetmap.de/routed-foot/route/v1/${type}/${location.lng},${location.lat};${destination.lng},${destination.lat}?overview=false&steps=true`
  )
    .then((response) => response.json())
    .then((data) => {
      data['routes'][0]['legs'].map((legs: any) => {
        legs['steps'].map((step: any) => {
          step['intersections'].map((intersection: any) => {
            const position: [number, number] = intersection['location'];
            routePoints.push(new L.LatLng(position[1], position[0]));
          });
        });
      });
      routePoints.slice(0, -1).map((_, i) => {
        newRoute.push([routePoints[i], routePoints[i + 1]]);
      });
      return newRoute;
      // at this point we have newRoute, we could do setRoute(newRoute) here, then no return
    })
    .catch((error) => console.log(error));
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
    ).then((data) => console.log(data));
  }, [points]);

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
        <CustomMarker position={wzimCoords} text={'WZIM'} />
        {road.length > 0 && <Polyline route={road} />}
        <OnMapClick />
      </MapContainer>
    </div>
  );
};

export default Map;
