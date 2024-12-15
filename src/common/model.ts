import { isArray, isObject, mapKeys, mapValues } from 'lodash';

export type PlaceObject = PointObject | AreaObject;

export interface AddressDTO {
  id: number;
  street: string;
  postal_code: string;
  city: string;
  city_eng: string;
}

export interface EntryDTO {
  id: number;
  latitude: string;
  longitude: string;
}

export interface GuideDTO {
  description: string | null;
  description_eng: string | null;
}

export interface Guide {
  description: string | null;
  descriptionEng: string | null;
}

export interface ObjectDTO {
  id: number;
  latitude: string;
  longitude: string;
  name: string;
  type: string | null;
  description: string | null;
  image_url: string | null;
  website: string | null;
  address: AddressDTO | null;
  guide: GuideDTO | null | any;
}

export interface Object {
  id: number;
  latitude: string;
  longitude: string;
  name: string;
  type: string | null;
  description: string | null;
  imageUrl: string | null;
  website: string | null;
  address: AddressDTO | null;
  guide: Guide | null | any;
}

export interface AreaObjectDTO extends ObjectDTO {
  entry?: EntryDTO[];
  number: number | null;
  is_paid: boolean | null;
  important_place: [];
}

export interface AreaObject extends Object {
  entry?: EntryDTO[];
  number: number | null;
  isPaid: boolean | null;
  importantPlace: [];
}

export interface PointObjectDTO extends ObjectDTO {
  event_category: string | null;
  event_start: any | null;
  event_end: any | null;
}

export interface PointObject extends Object {
  eventCategory: string | null;
  eventStart: any | null;
  eventEnd: any | null;
}

export interface ObjectsResponseDTO {
  point_objects: PointObjectDTO[];
  area_objects: AreaObjectDTO[];
}

export interface ObjectsResponse {
  pointObjects: PointObject[];
  areaObjects: AreaObject[];
}

export const mapObjKeys = (
  object: any,
  modifier: (key: string) => string
): { [key: string]: unknown } | unknown[] => {
  if (isArray(object)) {
    return object.map((item) => mapObjKeys(item, modifier));
  } else if (isObject(object)) {
    return mapValues(
      mapKeys(object, (_, k) => modifier(k)),
      (value) => mapObjKeys(value, modifier)
    );
  } else {
    return object;
  }
};