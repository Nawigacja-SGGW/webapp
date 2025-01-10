import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import Select from '../ui/Select/Select.tsx';
// import { PlaceObject } from '../../common/model.ts';
// import { SearchPlacesSelectOption } from '../../models';
// import { mapObjectsDataToSelectOption } from '../../utils';
import { Points, Places } from '../Map/Map.tsx';
import { Button } from '../../components/ui/Button/Button.tsx';

import { SwapVert } from '@styled-icons/material';
import './SearchPlaces.scss';

export type PathEndChosen = 'starting' | 'destination';

interface SearchPlacesSelectProps {
  points: Points;
  places: Places;
  setPoints: Dispatch<SetStateAction<Points>>;
  setPlaces: Dispatch<SetStateAction<Places>>;
}

// type SearchPlacesComponentState = {
//   startingPoint: SearchPlacesSelectOption | null;
//   destinationPoint: SearchPlacesSelectOption | null;
//   allObjects: SearchPlacesSelectOption[];
//   filteredObjects: SearchPlacesSelectOption[];
// };

export type SearchPlacesActionType =
  | 'changeDestinationPoint'
  | 'changeStartingPoint'
  | 'loadObjects';

// type SearchPlacesSelectAction = {
//   type: SearchPlacesActionType;
//   payload: SearchPlacesSelectOption | SearchPlacesSelectOption[] | null;
// };

export const SearchPlaces = ({ points, places, setPoints, setPlaces }: SearchPlacesSelectProps) => {
  // const reducer = (
  //   state: SearchPlacesComponentState,
  //   action: SearchPlacesSelectAction
  // ): SearchPlacesComponentState => {
  //   switch (action.type) {
  //     case 'changeStartingPoint':
  //       return {
  //         ...state,
  //         startingPoint: action.payload as SearchPlacesSelectOption | null,
  //         filteredObjects: state.allObjects.filter(
  //           (item: SearchPlacesSelectOption) =>
  //             item.label !== (action.payload as SearchPlacesSelectOption | null)?.label &&
  //             item.value !== (action.payload as SearchPlacesSelectOption | null)?.value &&
  //             item.label !== state.destinationPoint?.label &&
  //             item.value !== state.destinationPoint?.value
  //         ),
  //       };
  //     case 'loadObjects':
  //       return {
  //         ...state,
  //         allObjects: action.payload as SearchPlacesSelectOption[],
  //         filteredObjects: action.payload as SearchPlacesSelectOption[],
  //       };
  //     default:
  //       return state;
  //   }
  // };

  // const [state, dispatch] = useReducer(reducer, INITIAL_STATE, () => INITIAL_STATE);

  // Load all objects
  // only when first rendering this component
  // useEffect(() => {
  //   dispatch({
  //     type: 'loadObjects',
  //     payload: allLocations && mapObjectsDataToSelectOption(allLocations),
  //   });
  // }, [allLocations]);

  const { t } = useTranslation<string>();
  const navigate = useNavigate();
  const handleNavigateToList = (pathEndChosen: PathEndChosen) => {
    navigate('/home/objects', {
      state: { points: { ...points }, places: { ...places }, pathEndChosen: pathEndChosen },
    });
  };
  const handleRemovePlace = (pathEndChosen: PathEndChosen) => {
    if (pathEndChosen === 'starting') {
      setPoints({ ...points, startingPoint: points.locationPoint });
      setPlaces({ ...places, startingPlace: null });
    } else if (pathEndChosen === 'destination') {
      setPoints({ ...points, destinationPoint: null });
      setPlaces({ ...places, destinationPlace: null });
    }
  };
  const handleSwapPlaces = () => {
    setPlaces({
      startingPlace: places.destinationPlace,
      destinationPlace: places.startingPlace,
    });
    setPoints({
      ...points,
      startingPoint: points.destinationPoint,
      destinationPoint: points.startingPoint,
    });
  };

  return (
    <div className="search-places__wrapper">
      <div className="search-places-fields__wrapper">
        <div className="search-places-field__wrapper">
          <div className="search-places__input" onClick={() => handleNavigateToList('starting')}>
            {places.startingPlace
              ? places.startingPlace.name
              : points.locationPoint && points.startingPoint?.equals(points.locationPoint)
                ? t('homePage.searchPlaces.startPoint.placeholder')
                : t('mapPage.detailsPanel.title.point')}
          </div>
          <Button label="X" size="sm" onClick={() => handleRemovePlace('starting')} />
        </div>
        <hr></hr>
        <div className="search-places-field__wrapper">
          <div className="search-places__input" onClick={() => handleNavigateToList('destination')}>
            {places.destinationPlace
              ? places.destinationPlace.name
              : points.destinationPoint
                ? t('mapPage.detailsPanel.title.point')
                : t('homePage.searchPlaces.destination.placeholder')}
          </div>
          <Button label="X" size="sm" onClick={() => handleRemovePlace('destination')} />
          {/*//@ts-ignore*/}
          {/* <Select
            options={state.filteredObjects}
            className="search-places__input"
            placeholder="homePage.searchPlaces.destination.placeholder"
            isSearchable
            isClearable
            value={state.destinationPoint}
            onChange={(e) => {
              dispatch({
                type: 'changeDestinationPoint',
                payload: e as SearchPlacesSelectOption,
              });
            }}
          /> */}
        </div>
      </div>
      <div className="search-places-swap" onClick={handleSwapPlaces}>
        <SwapVert size="48" />
      </div>
    </div>
  );
};
