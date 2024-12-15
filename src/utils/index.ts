import axios from 'axios';
import { camelCase, flatten } from 'lodash';

import { SearchPlacesSelectOption } from '../models';
import { mapObjKeys, ObjectsResponse, PlaceObject } from '../common/model.ts';

export const getObjectsList = async (): Promise<PlaceObject[]> => {
  try {
    const { data } = await axios.get<ObjectsResponse>('/objects');
    const mappedObject = mapObjKeys(data, camelCase);
    return flatten(Object.values(mappedObject)) as PlaceObject[];
  } catch (e) {
    throw e as Error;
  }
};

export const mapObjectsDataToSelectOption = (data: PlaceObject[]): SearchPlacesSelectOption[] => {
  return Array.isArray(data)
    ? data?.map((d) => ({
        value: d,
        label: d.name,
      }))
    : [];
};
