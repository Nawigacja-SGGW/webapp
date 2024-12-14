import L from 'leaflet';

// map constraints
export const BORDER_SW = L.latLng(52.1524, 21.0354);
export const BORDER_NE = L.latLng(52.1704, 21.0554);

export const MAP_CENTER: L.LatLngExpression = [52.16256, 21.04219];
export const MAP_MAX_BOUNDS_VISCOSITY: number = 1;
export const MAP_ZOOM: number = 16;
export const MAP_MIN_ZOOM: number = 16;
export const MAP_MAX_ZOOM: number = 18;

type mode = '' | 'Walk' | 'Cycle';
type maneuver =
  | ''
  | 'turn'
  | 'new name'
  | 'depart'
  | 'arrive'
  | 'merge'
  | 'ramp'
  | 'on ramp'
  | 'off ramp'
  | 'fork'
  | 'end of road'
  | 'use lane'
  | 'continue'
  | 'roundabout'
  | 'rotary'
  | 'roundabout turn'
  | 'notification'
  | 'exit roundabout'
  | 'exit rotary';
type maneuverModifier =
  | ''
  | 'uturn'
  | 'sharp right'
  | 'right'
  | 'slight right'
  | 'straight'
  | 'slight left'
  | 'left'
  | 'sharp left';

export type PathInfo = {
  path: [L.LatLng, L.LatLng][];
  totalTime: number;
  totalDistance: number;
  transportationMode: mode;
  nextManeuver: maneuver;
  nextManeuverModifier: maneuverModifier;
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
    transportationMode: '',
    nextManeuver: '',
    nextManeuverModifier: '',
    distanceUntillNextDirection: -1,
  };

  return fetch(
    `${import.meta.env.VITE_OSMR_API_URL}/routed-${type}/route/v1/driving/${location.lng},${location.lat};${destination.lng},${destination.lat}?overview=false&steps=true`
  )
    .then((response) => response.json())
    .then((data) => data['routes'][0]['legs'][0])
    .then((route) => {
      pathInfo.totalTime = route['duration'];
      pathInfo.totalDistance = Math.round(route['distance']);
      pathInfo.transportationMode = route['steps'][0]['mode'] === 'walking' ? 'Walk' : 'Cycle';
      pathInfo.nextManeuver = route['steps'][1]['maneuver']['type'];
      pathInfo.nextManeuverModifier = route['steps'][1]['maneuver']['modifier'];
      pathInfo.distanceUntillNextDirection = Math.round(route['steps'][0]['distance']);

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

export async function getPaths(
  destinationPoints: L.LatLng[],
  type: 'foot' | 'bike'
): Promise<PathInfo[]> {
  const destinationPointsUrl = destinationPoints
    .reduce((prev, curr) => {
      return `${prev};${curr.lng},${curr.lat}`;
    }, '')
    .substring(1);

  return fetch(
    `${import.meta.env.VITE_OSMR_API_URL}/routed-${type}/route/v1/driving/${destinationPointsUrl}?overview=false&steps=true`
  )
    .then((response) => response.json())
    .then((data) => data['routes'][0]['legs'])
    .then((legs: any[]) => {
      const pathInfos = legs.map((route) => {
        const routePoints: L.LatLng[] = [];

        let pathInfo: PathInfo = {
          path: [],
          totalTime: -1,
          totalDistance: -1,
          transportationMode: '',
          nextManeuver: '',
          nextManeuverModifier: '',
          distanceUntillNextDirection: -1,
        };

        pathInfo.totalTime = route['duration'];
        pathInfo.totalDistance = Math.round(route['distance']);
        pathInfo.transportationMode = route['steps'][0]['mode'] === 'walking' ? 'Walk' : 'Cycle';
        pathInfo.nextManeuver = route['steps'][1]['maneuver']['type'];
        pathInfo.nextManeuverModifier = route['steps'][1]['maneuver']['modifier'];
        pathInfo.distanceUntillNextDirection = Math.round(route['steps'][0]['distance']);

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
      });

      return pathInfos;
    })
    .catch((error) => {
      throw new Error(error);
    });
}
