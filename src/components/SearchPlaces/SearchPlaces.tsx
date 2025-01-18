import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Points, Places } from '../Map/Map.tsx';
import { Button } from '../ui/Button/Button.tsx';

import { SwapVert } from '@styled-icons/material';
import './SearchPlaces.scss';

export type PathEndChosen = 'starting' | 'destination';

interface SearchPlacesSelectProps {
  points: Points;
  places: Places;
  setPoints: Dispatch<SetStateAction<Points>>;
  setPlaces: Dispatch<SetStateAction<Places>>;
}

export const SearchPlaces = ({ points, places, setPoints, setPlaces }: SearchPlacesSelectProps) => {
  const { t } = useTranslation<string>();
  const navigate = useNavigate();
  const handleNavigateToList = (pathEndChosen: PathEndChosen) => {
    navigate('/home/objects', {
      state: { points: { ...points }, places: { ...places }, pathEndChosen: pathEndChosen },
    });
  };
  const handleRemovePlace = (pathEndChosen: PathEndChosen) => {
    if (pathEndChosen === 'starting') {
      setPlaces((prevPlaces) => ({ ...prevPlaces, startingPlace: null }));
      setPoints((prevPoints) => ({
        ...prevPoints,
        startingPoint: prevPoints.locationPoint?.clone() ?? null,
      }));
    } else if (pathEndChosen === 'destination') {
      setPlaces((prevPlaces) => ({ ...prevPlaces, destinationPlace: null }));
      setPoints((prevPoints) => ({ ...prevPoints, destinationPoint: null }));
    }
  };
  const handleSwapPlaces = () => {
    setPlaces((prevPlaces) => ({
      startingPlace: prevPlaces.destinationPlace,
      destinationPlace: prevPlaces.startingPlace,
    }));
    setPoints((prevPoints) => ({
      ...prevPoints,
      startingPoint: prevPoints.destinationPoint,
      destinationPoint: prevPoints.startingPoint,
    }));
  };

  const getStartingLabel = (): string => {
    if (places.startingPlace) {
      return places.startingPlace.name;
    }
    // console.log(`locationPoint: ${points.locationPoint?.lat}`);
    // console.log(`startingPoint: ${points.startingPoint?.lat}`);
    return points.locationPoint
      ? points.startingPoint?.lat === points.locationPoint.lat &&
        points.startingPoint?.lng === points.locationPoint.lng
        ? t('homePage.searchPlaces.startPoint.location')
        : t('mapPage.detailsPanel.title.point')
      : points.startingPoint
        ? t('mapPage.detailsPanel.title.point')
        : t('homePage.searchPlaces.startPoint.placeholder');
  };
  const getDestinationLabel = (): string => {
    if (places.destinationPlace) {
      return places.destinationPlace.name;
    }
    return points.destinationPoint
      ? t('mapPage.detailsPanel.title.point')
      : t('homePage.searchPlaces.destination.placeholder');
  };

  return (
    <div className="search-places__wrapper">
      <div className="search-places-fields__wrapper">
        <div className="search-places-field__wrapper">
          <div className="search-places__input" onClick={() => handleNavigateToList('starting')}>
            {getStartingLabel()}
          </div>
          <Button label="X" size="sm" onClick={() => handleRemovePlace('starting')} />
        </div>
        <hr></hr>
        <div className="search-places-field__wrapper">
          <div className="search-places__input" onClick={() => handleNavigateToList('destination')}>
            {getDestinationLabel()}
          </div>
          <Button label="X" size="sm" onClick={() => handleRemovePlace('destination')} />
        </div>
      </div>
      <div
        className={
          points.locationPoint && points.destinationPoint
            ? 'search-places-swap'
            : 'search-places-swap-disabled'
        }
        onClick={points.locationPoint && points.destinationPoint ? handleSwapPlaces : () => {}}
      >
        <SwapVert size="48" />
      </div>
    </div>
  );
};
