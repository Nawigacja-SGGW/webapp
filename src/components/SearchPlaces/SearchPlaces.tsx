import { Dispatch, SetStateAction, useEffect, useReducer } from 'react';
import Select from '../ui/Select/Select.tsx';
import { ObjectData, SearchPlacesSelectOption } from '../../models';
import axios from 'axios';
import { mapObjectsDataToSelectOption } from '../../utils';
import { Button } from '../ui/Button/Button.tsx';
import './SearchPlaces.scss';

export const getObjectsList = async (): Promise<ObjectData[]> => {
  const { data } = await axios.get<ObjectData[], ObjectData[]>('/objects');
  return data;
};

type SearchPlacesComponentState = {
  startPoint: SearchPlacesSelectOption | null;
  destinationPoint: SearchPlacesSelectOption | null;
  allObjects: SearchPlacesSelectOption[];
};

export type SearchPlacesActionType = 'changeDestinationPoint' | 'changeStartPoint' | 'loadObjects';

type SearchPlacesSelectAction = {
  type: SearchPlacesActionType;
  payload: SearchPlacesSelectOption | SearchPlacesSelectOption[] | null;
};

interface SearchPlacesSelectProps {
  onSetPoints: Dispatch<
    SetStateAction<{
      startPoint: ObjectData;
      destinationPoint: ObjectData;
    }>
  >;
}

export const SearchPlaces = ({ onSetPoints }: SearchPlacesSelectProps) => {
  const reducer = (state: SearchPlacesComponentState, action: SearchPlacesSelectAction) => {
    switch (action.type) {
      case 'changeDestinationPoint':
        return {
          ...state,
          destinationPoint: action.payload as SearchPlacesSelectOption | null,
          allObjects:
            action.payload !== null
              ? state.allObjects.filter(
                  (obj) =>
                    obj.value.addressId !==
                    (action.payload as SearchPlacesSelectOption).value.addressId
                )
              : [...state.allObjects, state.destinationPoint],
        };
      case 'changeStartPoint':
        return {
          ...state,
          startPoint: action.payload as SearchPlacesSelectOption | null,
          allObjects:
            action.payload !== null
              ? state.allObjects.filter(
                  (obj) =>
                    obj &&
                    obj.value.addressId !==
                      (action.payload as SearchPlacesSelectOption).value.addressId
                )
              : [...state.allObjects, state.startPoint],
        };
      case 'loadObjects':
        return {
          ...state,
          allObjects: action.payload as SearchPlacesSelectOption[],
        };
      default:
        return state;
    }
  };

  const initialState: SearchPlacesComponentState = {
    startPoint: null,
    destinationPoint: null,
    allObjects: [],
  };

  const [state, dispatch] = useReducer(
    reducer,
    initialState as SearchPlacesComponentState,
    () => initialState
  );

  useEffect(() => {
    getObjectsList().then((data) => {
      const filteredData = data.filter((d) => {
        if (state.startPoint || state.destinationPoint) {
          return ![
            state.startPoint.value.addressId,
            state.destinationPoint.value.addressId,
          ].includes(d.addressId);
        } else {
          return true;
        }
      });
      dispatch({
        type: 'loadObjects',
        payload: mapObjectsDataToSelectOption(filteredData),
      });
    });
  }, [dispatch]);

  return (
    <div className="search-places__wrapper">
      <div className="search-places-field__wrapper">
        <Select
          options={state.allObjects}
          className="search-places__input"
          placeholder="homePage.searchPlaces.startPoint.placeholder"
          isSearchable
          isClearable
          value={state.startPoint}
          onChange={(e) =>
            dispatch({
              type: 'changeStartPoint',
              payload: e,
            })
          }
        />
      </div>
      <div className="search-places-field__wrapper">
        <Select
          options={state.allObjects}
          className="search-places__input"
          placeholder="homePage.searchPlaces.destination.placeholder"
          isSearchable
          isClearable
          value={state.destinationPoint}
          onChange={(e) =>
            dispatch({
              type: 'changeDestinationPoint',
              payload: e,
            })
          }
        />
      </div>
      <Button
        label="Search"
        primary
        onClick={() => {
          onSetPoints({
            startPoint: state.startPoint.value,
            destinationPoint: state.destinationPoint.value,
          });
        }}
      />
    </div>
  );
};
