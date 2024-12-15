import { ObjectData, SearchPlacesSelectOption } from '../models';

export const mapObjectsDataToSelectOption = (data: ObjectData[]): SearchPlacesSelectOption[] => {
  return data.length
    ? data.map((d) => ({
        value: d,
        label: d.name,
      }))
    : [];
};
