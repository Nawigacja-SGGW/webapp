import Select from 'react-select';
import { ObjectData, SearchPlacesSelectOption } from '../../models';
import axios from 'axios';
import { Dispatch, SetStateAction, useEffect, useReducer } from 'react';
import { mapObjectsDataToSelectOption } from '../../utils';
import { Button } from '../ui/Button/Button.tsx';
import './SearchPlaces.scss';
import { DomUtil } from 'leaflet';
import setPosition = DomUtil.setPosition;

export const getObjectsList = async (): Promise<ObjectData[]> => {
  return await axios.get('/objects').then((res) => res.data);
};

type SearchPlacesComponentState = {
  startPoint: SearchPlacesSelectOption | null;
  destinationPoint: SearchPlacesSelectOption | null;
  allObjects: SearchPlacesSelectOption[];
};

type SearchPlacesSelectAction = {
  type: SearchPlacesActionType;
  payload: SearchPlacesSelectOption | SearchPlacesSelectOption[] | null;
};

export type SearchPlacesActionType = 'changeDestinationPoint' | 'changeStartPoint' | 'loadObjects';

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
          destinationPoint: action.payload,
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
          startPoint: action.payload,
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
          allObjects: action.payload,
        };
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    startPoint: null,
    destinationPoint: null,
    allObjects: [],
  });

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
      <Select
        options={state.allObjects}
        className="search-places__input"
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
      <Select
        options={state.allObjects}
        className="search-places__input"
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
      <Button
        label="Search"
        primary
        onClick={() => {
          console.log('setting points');
          onSetPoints({
            startPoint: state.startPoint.value,
            destinationPoint: state.destinationPoint.value,
          });
        }}
      />
    </div>
  );
};
