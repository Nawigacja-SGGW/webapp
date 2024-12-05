import { Dispatch, SetStateAction, useEffect, useReducer } from 'react';
import Select from '../ui/Select/Select.tsx';
import { ObjectData, SearchPlacesSelectOption } from '../../models';
import axios from 'axios';
import { mapObjectsDataToSelectOption } from '../../utils';
import { Points } from '../Map/Map.tsx';
import { Button } from '../ui/Button/Button.tsx';
import './SearchPlaces.scss';
import L from 'leaflet';
import { OnChangeValue } from 'react-select';

export const getObjectsList = async (): Promise<ObjectData[]> => {
  const { data } = await axios.get<ObjectData[], ObjectData[]>('/objects');
  return data;
};

interface SearchPlacesSelectProps {
  points: Points;
  onSetPoints: Dispatch<SetStateAction<Points>>;
  allLocations: ObjectData[];
}

type SearchPlacesComponentState = {
  locationPoint: SearchPlacesSelectOption | null;
  destinationPoint: SearchPlacesSelectOption | null;
  allObjects: SearchPlacesSelectOption[];
  filteredObjects: SearchPlacesSelectOption[];
};

export type SearchPlacesActionType = 'changeDestinationPoint' | 'loadObjects'; //  | 'changeLocationPoint' | 'filterObjects'

type SearchPlacesSelectAction = {
  type: SearchPlacesActionType;
  payload: SearchPlacesSelectOption | SearchPlacesSelectOption[] | null;
};

const INITIAL_STATE: SearchPlacesComponentState = {
  locationPoint: null,
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
      case 'changeDestinationPoint':
        return {
          ...state,
          destinationPoint: action.payload as SearchPlacesSelectOption | null,
          // allObjects:
          //   action.payload !== null
          //     ? state.allObjects.filter(
          //         (obj) =>
          //           obj.value.addressId !==
          //           (action.payload as SearchPlacesSelectOption).value.addressId
          //       )
          //     : [...state.allObjects, state.destinationPoint],
        };
      // case 'changeLocationPoint':
      //   return {
      //     ...state,
      //     locationPoint: action.payload as SearchPlacesSelectOption | null,
      //     // allObjects:
      //     //   action.payload !== null
      //     //     ? state.allObjects.filter(
      //     //         (obj) =>
      //     //           obj &&
      //     //           obj.value.addressId !==
      //     //             (action.payload as SearchPlacesSelectOption).value.addressId
      //     //       )
      //     //     : [...state.allObjects, state.locationPoint],
      //   };
      case 'loadObjects':
        return {
          ...state,
          allObjects: action.payload as SearchPlacesSelectOption[],
        };
      // case 'filterObjects':
      //   return {
      //     ...state,
      //     filteredObjects:
      //       action.payload !== null
      //         ? state.allObjects.filter((obj) => {
      //           obj && obj.value !== (action.payload as SearchPlacesSelectOption).value
      //         })
      //         : [...state.allObjects],
      //   }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE, () => INITIAL_STATE);

  // I feel like fetching all object each time we choose option isn't optimal
  // Wouldn't it be better to fetch them once (in Map.tsx, as it also needs them) and pass them here
  // and then just filter for specific use cases?
  // useEffect(() => {
  //   getObjectsList().then((data) => {
  //     const filteredData = data.filter((d) => {
  //       if (state.locationPoint || state.destinationPoint) {
  //         return ![
  //           state.locationPoint.value.addressId,
  //           state.destinationPoint.value.addressId,
  //         ].includes(d.addressId);
  //       } else {
  //         return true;
  //       }
  //     });
  //     dispatch({
  //       type: 'loadObjects',
  //       payload: mapObjectsDataToSelectOption(filteredData),
  //     });
  //   });
  // }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: 'loadObjects',
      payload: mapObjectsDataToSelectOption(allLocations),
    });
  }, []); // only when first rendering

  useEffect(() => {
    if (
      state.destinationPoint &&
      (!points.destinationPoint || points.destinationPoint !== state.destinationPoint.value)
    ) {
      onSetPoints({
        ...points,
        destinationPoint: state.destinationPoint.value,
      });
    }
  }, [state.destinationPoint]);

  useEffect(() => {
    if (points.destinationPoint && points.destinationPoint !== state.destinationPoint?.value) {
      dispatch({
        type: 'changeDestinationPoint',
        payload: {
          value: points.destinationPoint,
          label: points.destinationPoint.name,
        },
      });
    }
  }, [points.destinationPoint]);

  return (
    <div className="search-places__wrapper">
      <div className="search-places-field__wrapper">
        <Select
          // options={state.allObjects.filter((item: SearchPlacesSelectOption) => item !== state.destinationPoint && item !== state.locationPoint)}
          className="search-places__input"
          placeholder="homePage.searchPlaces.startPoint.placeholder"
          isSearchable
          isClearable
          value={state.locationPoint}
          onChange={(_) => {
            // dispatch({
            //   type: 'changeLocationPoint',
            //   payload: e as SearchPlacesSelectOption,
            // })
            // onSetPoints({
            //   ...points,
            //   locationPoint: state.locationPoint ? L.latLng(state.locationPoint.value.lat, state.locationPoint.value.lng) : null
            // })
          }}
        />
      </div>
      <div className="search-places-field__wrapper">
        <Select
          options={state.allObjects.filter(
            (item: SearchPlacesSelectOption) =>
              item !== state.destinationPoint && item !== state.locationPoint
          )}
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
