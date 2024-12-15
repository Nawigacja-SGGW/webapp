export type Place = {
  lat: string;
  lon: string;
  name: string;
  type: string;
  description: string;
  imageUrl: string;
  addressId: number;
  guideId: number;
};

export const demo_places: Place[] = [
  {
    lat: '40.712776',
    lon: '-74.005974',
    name: 'Statue of Liberty',
    type: 'Historical Monument',
    description: 'An iconic symbol of freedom located on Liberty Island.',
    imageUrl: 'https://example.com/statue_of_liberty.jpg',
    addressId: 1,
    guideId: 101,
  },
  {
    lat: '48.858844',
    lon: '2.294351',
    name: 'Eiffel Tower',
    type: 'Landmark',
    description: 'A wrought-iron lattice tower in Paris, France, known worldwide.',
    imageUrl: 'https://example.com/eiffel_tower.jpg',
    addressId: 2,
    guideId: 102,
  },
  {
    lat: '35.689487',
    lon: '139.691711',
    name: 'Tokyo Tower',
    type: 'Observation Tower',
    description:
      'A communications and observation tower in the Shiba-Koen district of Minato, Tokyo.',
    imageUrl: 'https://example.com/tokyo_tower.jpg',
    addressId: 3,
    guideId: 103,
  },
  {
    lat: '-33.856784',
    lon: '151.215296',
    name: 'Sydney Opera House',
    type: 'Theatre',
    description: 'A multi-venue performing arts center at Sydney Harbour in Sydney, Australia.',
    imageUrl: 'https://example.com/sydney_opera_house.jpg',
    addressId: 4,
    guideId: 104,
  },
  {
    lat: '51.500729',
    lon: '-0.124625',
    name: 'Big Ben',
    type: 'Clock Tower',
    description:
      'The nickname for the Great Bell of the clock at the north end of the Palace of Westminster in London.',
    imageUrl: 'https://example.com/big_ben.jpg',
    addressId: 5,
    guideId: 105,
  },
  {
    lat: '27.175015',
    lon: '78.042155',
    name: 'Taj Mahal',
    type: 'Mausoleum',
    description:
      'An ivory-white marble mausoleum on the south bank of the Yamuna river in Agra, India.',
    imageUrl: 'https://example.com/taj_mahal.jpg',
    addressId: 6,
    guideId: 106,
  },
  {
    lat: '-22.951917',
    lon: '-43.210487',
    name: 'Christ the Redeemer',
    type: 'Statue',
    description: 'An Art Deco statue of Jesus Christ in Rio de Janeiro, Brazil.',
    imageUrl: 'https://example.com/christ_the_redeemer.jpg',
    addressId: 7,
    guideId: 107,
  },
  {
    lat: '37.819929',
    lon: '-122.478255',
    name: 'Golden Gate Bridge',
    type: 'Bridge',
    description:
      'A suspension bridge spanning the Golden Gate, the strait connecting San Francisco Bay and the Pacific Ocean.',
    imageUrl: 'https://example.com/golden_gate_bridge.jpg',
    addressId: 8,
    guideId: 108,
  },
  {
    lat: '55.755825',
    lon: '37.617298',
    name: 'Red Square',
    type: 'Public Square',
    description: 'A city square in Moscow, Russia, known for its historical significance.',
    imageUrl: 'https://example.com/red_square.jpg',
    addressId: 9,
    guideId: 109,
  },
  {
    lat: '25.197197',
    lon: '55.274376',
    name: 'Burj Khalifa',
    type: 'Skyscraper',
    description: 'The tallest structure and building in the world located in Dubai, UAE.',
    imageUrl: 'https://example.com/burj_khalifa.jpg',
    addressId: 10,
    guideId: 110,
  },
];
