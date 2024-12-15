export interface ObjectData {
  lat: number;
  lng: number;
  name: string;
  type: string;
  description: string;
  imageUrl: string;
  website: string;
  addressId: number;
  guideId: number;
}

export interface SearchPlacesSelectOption {
  value: ObjectData;
  label: string;
}
