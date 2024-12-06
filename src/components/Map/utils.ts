import L from 'leaflet';

export type PathInfo = {
  path: [L.LatLng, L.LatLng][];
  totalTime: number;
  totalDistance: number;
  direction: string;
  nextDirection: string;
  distanceUntillNextDirection: number;
};

export async function getPath(
  location: L.LatLng,
  destination: L.LatLng,
  type: 'foot' | 'bike'
): Promise<PathInfo> {
  const routePoints: L.LatLng[] = [];

  let pathInfo: PathInfo = {
    path: [],
    totalTime: -1,
    totalDistance: -1,
    direction: '',
    nextDirection: '',
    distanceUntillNextDirection: -1,
  };

  return fetch(
    `${import.meta.env.VITE_OSMR_API_URL}/routed-${type}/route/v1/driving/${location.lng},${location.lat};${destination.lng},${destination.lat}?overview=false&steps=true`
  )
    .then((response) => response.json())
    .then((data) => data['routes'][0]['legs'][0])
    .then((route) => {
      pathInfo.totalTime = route['duration'];
      pathInfo.totalDistance = route['distance'];
      pathInfo.direction = route['steps'][0]['mode'] === 'walking' ? 'Walk' : 'Cycle';
      pathInfo.nextDirection = `${route['steps'][1]['maneuver']['type']} ${route['steps'][1]['maneuver']['modifier']}`;
      pathInfo.distanceUntillNextDirection = route['steps'][0]['distance'];

      route['steps'].map((step: any) => {
        step['intersections'].map((intersection: any) => {
          const position: [number, number] = intersection['location'];
          routePoints.push(new L.LatLng(position[1], position[0]));
        });
      });
      routePoints.slice(0, -1).map((_, i) => {
        pathInfo.path.push([routePoints[i], routePoints[i + 1]]);
      });
      return pathInfo;
      // at this point we have newRoute, we could do setRoute(newRoute) here, then no return
    })
    .catch((error) => {
      throw new Error(error);
    });
}
