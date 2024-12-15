import { Dispatch, SetStateAction, useEffect, useReducer } from 'react';
import Select from '../ui/Select/Select.tsx';
import { ObjectData, SearchPlacesSelectOption } from '../../models';
import axios from 'axios';
import { mapObjectsDataToSelectOption } from '../../utils';
import { Points } from '../Map/Map.tsx';
import './SearchPlaces.scss';

export const getObjectsList = async () => {
  //@ts-ignore
  const { data } = await axios.get('/objects');
  return data;
};

interface SearchPlacesSelectProps {
  points: Points;
  onSetPoints: Dispatch<SetStateAction<Points>>;
  allLocations: ObjectData[];
}

type SearchPlacesComponentState = {
  startingPoint: SearchPlacesSelectOption | null;
  destinationPoint: SearchPlacesSelectOption | null;
  allObjects: SearchPlacesSelectOption[];
  filteredObjects: SearchPlacesSelectOption[];
};

export type SearchPlacesActionType =
  | 'changeDestinationPoint'
  | 'changeStartingPoint'
  | 'loadObjects';

type SearchPlacesSelectAction = {
  type: SearchPlacesActionType;
  payload: SearchPlacesSelectOption | SearchPlacesSelectOption[] | null;
};

const INITIAL_STATE: SearchPlacesComponentState = {
  startingPoint: null,
  destinationPoint: null,
  allObjects: [],
  filteredObjects: [],
};

export const SearchPlaces = ({ points, onSetPoints, allLocations }: SearchPlacesSelectProps) => {
  const reducer = (
    state: SearchPlacesComponentState,
    action: SearchPlacesSelectAction
  ): SearchPlacesComponentState => {
    switch (action.type) {
      case 'changeStartingPoint':
        return {
          ...state,
          startingPoint: action.payload as SearchPlacesSelectOption | null,
          filteredObjects: state.allObjects.filter(
            (item: SearchPlacesSelectOption) =>
              item.label !== (action.payload as SearchPlacesSelectOption | null)?.label &&
              item.value !== (action.payload as SearchPlacesSelectOption | null)?.value &&
              item.label !== state.destinationPoint?.label &&
              item.value !== state.destinationPoint?.value
          ),
        };
      case 'changeDestinationPoint':
        return {
          ...state,
          destinationPoint: action.payload as SearchPlacesSelectOption | null,
          filteredObjects: state.allObjects.filter(
            (item: SearchPlacesSelectOption) =>
              item.label !== state.startingPoint?.label &&
              item.value !== state.startingPoint?.value &&
              item.label !== (action.payload as SearchPlacesSelectOption | null)?.label &&
              item.value !== (action.payload as SearchPlacesSelectOption | null)?.value
          ),
        };
      case 'loadObjects':
        return {
          ...state,
          allObjects: action.payload as SearchPlacesSelectOption[],
          filteredObjects: action.payload as SearchPlacesSelectOption[],
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE, () => INITIAL_STATE);

  // Load all objects
  // only when first rendering this component
  useEffect(() => {
    dispatch({
      type: 'loadObjects',
      payload: allLocations && mapObjectsDataToSelectOption(allLocations),
    });
  }, [allLocations]);

  // Following useEffects are for syncing between Map points and Searchlaces state

  // Update destination in Map
  // when chosen destination from list
  useEffect(() => {
    if (points.destinationPoint !== state.destinationPoint?.value) {
      onSetPoints({
        ...points,
        destinationPoint: state.destinationPoint ? state.destinationPoint.value : null,
      });
    }
  }, [state.destinationPoint]);

  // Update location in Map
  // when chosen location from list
  useEffect(() => {
    if (points.startingPoint !== state.startingPoint?.value) {
      onSetPoints({
        ...points,
        locationCoords: state.startingPoint ? null : points.locationCoords,
        startingPoint: state.startingPoint ? state.startingPoint.value : null,
      });
    }
  }, [state.startingPoint]);

  // Update destination (and location) here
  // when clicked on a pin
  // or clicked on map
  useEffect(() => {
    if (points.destinationPoint && points.destinationPoint !== state.destinationPoint?.value) {
      dispatch({
        type: 'changeDestinationPoint',
        payload: {
          value: points.destinationPoint,
          label: points.destinationPoint.name,
        } as SearchPlacesSelectOption,
      });

      if (points.destinationPoint === state.startingPoint?.value) {
        dispatch({
          type: 'changeStartingPoint',
          payload: null,
        });
      }
    } else if (points.locationCoords) {
      dispatch({
        type: 'changeStartingPoint',
        payload: null,
      });
    }
  }, [points]);

  return (
    <div className="search-places__wrapper">
      <div className="search-places-field__wrapper">
        {/*//@ts-ignore*/}
        <Select
          options={state.filteredObjects}
          className="search-places__input"
          placeholder="homePage.searchPlaces.startPoint.placeholder"
          isSearchable
          isClearable
          value={state.startingPoint}
          onChange={(e) => {
            dispatch({
              type: 'changeStartingPoint',
              payload: e as SearchPlacesSelectOption,
            });
          }}
        />
      </div>
      <div className="search-places-field__wrapper">
        {/*//@ts-ignore*/}
        <Select
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
        />
      </div>
      {/* <Button
        label="Search"
        primary
        onClick={() => {
          onSetPoints({
            locationPoint: state.locationPoint ? L.latLng(state.locationPoint.value.lat, state.locationPoint.value.lng) : null,
            destinationPoint: state.destinationPoint?.value ?? null,
          });
        }}
      /> */}
    </div>
  );
};
