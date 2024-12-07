import { http, HttpResponse } from 'msw';

export interface ObjectData {
  lat: string;
  lng: string;
  name: string;
  type: string;
  description: string;
  imageUrl: string;
  website: string;
  addressId: number;
  guideId: number;
}

export const handlers = [
  http.get('/objects', () => {
    return HttpResponse.json<ObjectData[]>([
      {
        lat: '52.162',
        lng: '21.046319957149112',
        name: 'Budynek 34',
        type: 'building',
        description: 'dasdas das dasd adas dadas d adadasd asd ad asd asda dasd adad asd ada ',
        imageUrl: 'https://example.com/statue_of_liberty.jpg',
        website: 'example website building 34',
        addressId: 1,
        guideId: 1,
      },
      {
        lat: '52.1600272',
        lng: '21.044767625367818',
        name: 'Budynek 32',
        type: 'building',
        description: 'dasdas das dasd adas dadas d adadasd asd ad asd asda dasd adad asd ada ',
        imageUrl: 'https://example.com/statue_of_liberty.jpg',
        website: 'example website building 32',
        addressId: 2,
        guideId: 2,
      },
      {
        lat: '52.1600272',
        lng: '21.044767625367818',
        name: 'Kawiarnia',
        type: 'building',
        description: 'dasdas das dasd adas dadas d adadasd asd ad asd asda dasd adad asd ada ',
        imageUrl: 'https://example.com/statue_of_liberty.jpg',
        website: 'example website building 32',
        addressId: 3,
        guideId: 3,
      },
    ]);
  }),
  http.get('/objects/1', () => {
    return HttpResponse.json<ObjectData>({
      lat: '52.162',
      lng: '21.046319957149112',
      name: 'Budynek 34',
      type: 'building',
      description: 'dasdas das dasd adas dadas d adadasd asd ad asd asda dasd adad asd ada ',
      imageUrl: 'https://example.com/statue_of_liberty.jpg',
      website: 'example website building 34',
      addressId: 1,
      guideId: 1,
    });
  }),
  http.get('/objects/2', () => {
    return HttpResponse.json<ObjectData>({
      lat: '52.1600272',
      lng: '21.044767625367818',
      name: 'Budynek 32',
      type: 'building',
      description: 'dasdas das dasd adas dadas d adadasd asd ad asd asda dasd adad asd ada ',
      imageUrl: 'https://example.com/statue_of_liberty.jpg',
      website: 'example website building 32',
      addressId: 2,
      guideId: 2,
    });
  }),
  http.get('/objects/3', () => {
    return HttpResponse.json<ObjectData>({
      lat: '52.1600272',
      lng: '21.044767625367818',
      name: 'Kawiarnia',
      type: 'building',
      description: 'dasdas das dasd adas dadas d adadasd asd ad asd asda dasd adad asd ada ',
      imageUrl: 'https://example.com/statue_of_liberty.jpg',
      website: 'example website building 32',
      addressId: 3,
      guideId: 3,
    });
  }),
];
