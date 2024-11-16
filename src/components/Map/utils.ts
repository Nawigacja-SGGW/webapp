import L from 'leaflet';

export async function getPath(
  location: L.LatLng,
  destination: L.LatLng,
  type: 'foot' | 'bike'
): Promise<[L.LatLng, L.LatLng][]> {
  const newRoute: [L.LatLng, L.LatLng][] = [];
  const routePoints: L.LatLng[] = [];

  return fetch(
    `${import.meta.env.VITE_OSMR_API_URL}/${type}/${location.lng},${location.lat};${destination.lng},${destination.lat}?overview=false&steps=true`
  )
    .then((response) => response.json())
    .then((data) => {
      data['routes'][0]['legs'].map((legs: any) => {
        legs['steps'].map((step: any) => {
          step['intersections'].map((intersection: any) => {
            const position: [number, number] = intersection['location'];
            routePoints.push(new L.LatLng(position[1], position[0]));
          });
        });
      });
      routePoints.slice(0, -1).map((_, i) => {
        newRoute.push([routePoints[i], routePoints[i + 1]]);
      });
      return newRoute;
      // at this point we have newRoute, we could do setRoute(newRoute) here, then no return
    })
    .catch((error) => console.log(error));
}
