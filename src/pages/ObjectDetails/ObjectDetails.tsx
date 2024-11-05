import { useParams } from 'react-router-dom';
import { demo_places, Place } from '../../mocks/places.ts';
import { useEffect, useState } from 'react';

export const ObjectDetails = () => {
  const { id } = useParams();
  const [placeData, setPlaceData] = useState<Place>();

  useEffect(() => {
    if (
      !Number.isFinite(Number(id)) ||
      (Number.isFinite(Number(id)) &&
        !demo_places.find((place) => place.addressId === parseInt(id!)))
    ) {
      console.log('invalid param');
    } else {
      setPlaceData(demo_places.find((place) => place.addressId === parseInt(id!)));
    }
  }, [placeData?.addressId, id]);

  return <div>{placeData && Object.values(placeData).map((val) => <li>{val}</li>)}</div>;
};
