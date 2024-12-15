import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TextObject } from './components/TextObject.tsx';
import { MapContainer, TileLayer } from 'react-leaflet';
import CustomMarker from '../../components/Map/CustomMarker.tsx';
import { PlaceObject } from '../../common/model.ts';
import L from 'leaflet';

import './ObjectDetails.scss';

export const ObjectDetails = () => {
  const { id } = useParams();
  const [placeData, setPlaceData] = useState<PlaceObject>();
  const [coords, setCoords] = useState<L.LatLng>();

  async function fetchLocation(): Promise<void> {
    const response = await fetch(`/object/${id}`);
    const data: PlaceObject = await response.json();

    if (!Number.isFinite(Number(id)) || !data) {
      console.log('Invalid param');
    } else {
      setPlaceData(data);
      setCoords(L.latLng(parseFloat(data.latitude), parseFloat(data.longitude)));
    }
  }

  useEffect(() => {
    fetchLocation();
  }, [id]);

  const sw = L.latLng(52.15656, 21.03624);
  const ne = L.latLng(52.1674, 21.05596);

  return (
    <div className="main-container">
      <div className="image">{/*<img src={placeData.imageUrl} alt="" />*/}</div>
      <div className="details">
        <div>
          <TextObject
            title={placeData?.name || ''}
            link={placeData?.website || ''}
            address={placeData?.latitude || ''}
            city={placeData?.longitude || ''}
            buildingInfo={placeData?.type || ''}
            description={placeData?.description || ''}
          />
        </div>
        <div className="map">
          {coords && (
            <MapContainer
              center={[coords.lat, coords.lng]}
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
              <CustomMarker position={coords} />
            </MapContainer>
          )}
        </div>
      </div>
    </div>
  );
};
