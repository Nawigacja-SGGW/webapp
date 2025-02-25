import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Address, TextObject } from './components/TextObject.tsx';
import { MapContainer, TileLayer } from 'react-leaflet';
import CustomMarker from '../../components/Map/CustomMarker.tsx';
import { PlaceObject, PlaceObjectDTO } from '../../common/model.ts';
import L from 'leaflet';

import './ObjectDetails.scss';
import axios from 'axios';
import { Button } from '../../components/ui/Button/Button.tsx';

export const ObjectDetails = () => {
  const { id } = useParams();
  const [placeData, setPlaceData] = useState<PlaceObject>();
  const [coords, setCoords] = useState<L.LatLng>();

  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleNavigateToMap = () => {
    console.log(`placeData: ${placeData}`);
    navigate(`/home/map`, { state: { placeData: placeData } });
  };

  async function fetchLocation(): Promise<void> {
    const { data } = await axios.get<PlaceObjectDTO>(
      `${import.meta.env.VITE_MAIN_API_URL}/single-object?id=${id}`
    );

    if (!Number.isFinite(Number(id)) || !data) {
      throw new Error('Invalid param');
    } else {
      setPlaceData(data.object as PlaceObject);
      setCoords(L.latLng(parseFloat(data.object.latitude), parseFloat(data.object.longitude)));
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
            address={placeData?.address || ({} as Address)}
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
          <Button
            className="navigate-button"
            label={t('objectDetailsPage.button.navigate')}
            size="lg"
            primary={true}
            onClick={handleNavigateToMap}
          />
        </div>
      </div>
    </div>
  );
};
