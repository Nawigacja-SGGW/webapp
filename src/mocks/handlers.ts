import { http, HttpResponse } from 'msw';
import { ObjectsResponseDTO, PlaceObjectDTO } from '../common/model.ts';
import { flatten } from 'lodash';

const objects: ObjectsResponseDTO = {
  point_objects: [
    {
      id: 6,
      latitude: '52.163633262139335',
      longitude: '21.04485534816971',
      name: 'Dąb Jana Pawła II',
      type: 'Pomnik',
      description: 'Dąb Jana Pawła II',
      image_url: null,
      website: null,
      address: null,
      guide: null,
      event_category: null,
      event_start: null,
      event_end: null,
    },
    {
      id: 7,
      latitude: '52.164435836537145',
      longitude: '21.045536437007588',
      name: 'Pomnik Władysława Grabskiego',
      type: 'Pomnik',
      description: 'Pomnik Władysława Grabskiego',
      image_url: null,
      website: null,
      address: null,
      guide: null,
      event_category: null,
      event_start: null,
      event_end: null,
    },
    {
      id: 8,
      latitude: '52.16239945537722',
      longitude: '21.046062337221112',
      name: 'Pomnik Stanisława Wawrzyńca Staszica',
      type: 'Pomnik',
      description: 'Pomnik Stanisława Wawrzyńca Staszica',
      image_url: null,
      website: null,
      address: null,
      guide: null,
      event_category: null,
      event_start: null,
      event_end: null,
    },
    {
      id: 9,
      latitude: '52.164725887319435',
      longitude: '21.05008100704184',
      name: 'Pomnik hrabiego Edwarda Raczyńskiego',
      type: 'Pomnik',
      description: 'Pomnik hrabiego Edwarda Raczyńskiego',
      image_url: null,
      website: null,
      address: null,
      guide: null,
      event_category: null,
      event_start: null,
      event_end: null,
    },
    {
      id: 10,
      latitude: '52.16374706777013',
      longitude: '21.04820342328327',
      name: 'Pomnik Juliana Ursyna Niemcewicza',
      type: 'Pomnik',
      description: 'Pomnik Juliana Ursyna Niemcewicza',
      image_url: null,
      website: null,
      address: null,
      guide: null,
      event_category: null,
      event_start: null,
      event_end: null,
    },
  ],
  area_objects: [
    {
      id: 1,
      latitude: '52.162130819838154',
      longitude: '21.046113804785662',
      name: 'Budynek 34',
      type: 'Budynek wydziałowy',
      description:
        'Budynek 34 mieści w sobie 3 wydziały: Leśny, Technologii Drewna, oraz Zastosowań Informatyki i Matematyki',
      image_url: null,
      website: null,
      address: {
        id: 1,
        street: 'Nowoursynowska 159',
        postal_code: '02-787',
        city: 'Warszawa',
        city_eng: 'Warsaw',
      },
      guide: null,
      number: 34,
      is_paid: null,
      entry: [
        {
          id: 1,
          latitude: '52.16214280573603',
          longitude: '21.045923531050054',
        },
        {
          id: 2,
          latitude: '52.16227105365284',
          longitude: '21.046207264454786',
        },
        {
          id: 3,
          latitude: '52.16173492830468',
          longitude: '21.046379508367792',
        },
        {
          id: 4,
          latitude: '52.16182689187044',
          longitude: '21.046628305130426',
        },
      ],
      important_place: [],
    },
    {
      id: 2,
      latitude: '52.16089179818332',
      longitude: '21.04659408329729',
      name: 'Budynek 33',
      type: 'Budynek wydziałowy',
      description: 'Budynek 33 jest budynkiem Wydziału Budownictwa i Inżynierii Środowiska',
      image_url: null,
      website: null,
      address: {
        id: 2,
        street: 'Nowoursynowska 159',
        postal_code: '02-776',
        city: 'Warszawa',
        city_eng: 'Warsaw',
      },
      guide: null,
      number: 33,
      is_paid: null,
      entry: [
        {
          id: 5,
          latitude: '52.160875940272966',
          longitude: '21.045885104544826',
        },
        {
          id: 6,
          latitude: '52.16058438931783',
          longitude: '21.04667615066083',
        },
      ],
      important_place: [],
    },
    {
      id: 3,
      latitude: '52.160069095051924',
      longitude: '21.044743359070935',
      name: 'Budynek 32',
      type: 'Budynek wydziałowy',
      description: null,
      image_url: null,
      website: null,
      address: {
        id: 2,
        street: 'Nowoursynowska 159',
        postal_code: '02-776',
        city: 'Warszawa',
        city_eng: 'Warsaw',
      },
      guide: null,
      number: 32,
      is_paid: null,
      entry: [
        {
          id: 7,
          latitude: '52.16000642925278',
          longitude: '21.044292626236576',
        },
        {
          id: 8,
          latitude: '52.15990759216802',
          longitude: '21.044389294865283',
        },
        {
          id: 9,
          latitude: '52.16026999374027',
          longitude: '21.04501943111214',
        },
        {
          id: 10,
          latitude: '52.16019751366305',
          longitude: '21.04513042101883',
        },
        {
          id: 11,
          latitude: '52.16022868756075',
          longitude: '21.045106115765805',
        },
        {
          id: 12,
          latitude: '52.15993825994222',
          longitude: '21.044350458266752',
        },
      ],
      important_place: [],
    },
    {
      id: 4,
      latitude: '52.16186585901004',
      longitude: '21.042903363702703',
      name: 'Budynek 37',
      type: 'Budynek wydziałowy',
      description:
        'Budynek 37, mieści Wydział Rolnictwa i Ekologii Szkoły, oraz Wydział Biologii i Biotechnologii',
      image_url: null,
      website: null,
      address: {
        id: 2,
        street: 'Nowoursynowska 159',
        postal_code: '02-776',
        city: 'Warszawa',
        city_eng: 'Warsaw',
      },
      guide: null,
      number: 37,
      is_paid: null,
      entry: [
        {
          id: 13,
          latitude: '52.162120077780436',
          longitude: '21.043204737891376',
        },
        {
          id: 14,
          latitude: '52.16192263587037',
          longitude: '21.043338848342465',
        },
        {
          id: 15,
          latitude: '52.161835565813725',
          longitude: '21.04246618778705',
        },
        {
          id: 16,
          latitude: '52.16166533526709',
          longitude: '21.04263364714627',
        },
      ],
      important_place: [],
    },
    {
      id: 5,
      latitude: '52.163689518446155',
      longitude: '21.042871175261016',
      name: '„Adara” Dom Studencki',
      type: 'Akademik',
      description: null,
      image_url: null,
      website: null,
      address: {
        id: 3,
        street: 'Nowoursynowska 161a',
        postal_code: '02-787',
        city: 'Warszawa',
        city_eng: 'Warsaw',
      },
      guide: null,
      number: null,
      is_paid: null,
      entry: [
        {
          id: 17,
          latitude: '52.16366569115122',
          longitude: '21.043102021053002',
        },
      ],
      important_place: [],
    },
    {
      id: 12,
      latitude: '52.16468443368795',
      longitude: '21.05046059748878',
      name: 'Rektorat',
      type: null,
      description: 'Rektorat, Kanclerz SGGW, budynek 12',
      image_url: null,
      website: null,
      address: {
        id: 4,
        street: 'Nowoursynowska 166',
        postal_code: '02-787',
        city: 'Warszawa',
        city_eng: 'Warsaw',
      },
      guide: null,
      number: 12,
      is_paid: null,
      entry: [
        {
          id: 18,
          latitude: '52.16464022859862',
          longitude: '21.05028529403395',
        },
      ],
      important_place: [],
    },
  ],
};

export const handlers = [
  http.get('/objects', () => {
    return HttpResponse.json<ObjectsResponseDTO>(objects);
  }),
  http.get('/single-object', ({ request }) => {
    const url = new URL(request.url);
    const objectId = url.searchParams.get('id');
    const response = objectId
      ? flatten([
          ...Object.values(objects.point_objects),
          ...Object.values(objects.area_objects),
        ]).find((obj) => obj.id === parseInt(objectId))
      : undefined;
    if (response) {
      return HttpResponse.json<PlaceObjectDTO>(response);
    }
  }),
];
