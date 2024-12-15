import L from 'leaflet';
import { MapContainer, Polyline, TileLayer } from 'react-leaflet';
import '../../leaflet.css';
import {
  BORDER_NE,
  BORDER_SW,
  getPaths,
  MAP_CENTER,
  MAP_MAX_BOUNDS_VISCOSITY,
  MAP_MAX_ZOOM,
  MAP_MIN_ZOOM,
  MAP_ZOOM,
  PathInfo,
} from '../../components/Map/utils';
import { useEffect, useState } from 'react';
import { useAppStore, AppState } from '../../store/index.ts';
import { IndexMarker } from '../../components/Map/IndexMarker.tsx';
import CampusGuide, { CampusGuideLocation } from '../../components/CampusGuide/CampusGuide.tsx';

type GuideDestinationPlace = {
  name: string;
  position: L.LatLng;
};

export const GuidePage = () => {
  const route_type = useAppStore((state: AppState) => state.preferences.routePreference);

  const [pathsInfos, setPathsInfo] = useState<PathInfo[]>([]);
  const [campusGuideLocations, setCampusGuideLocations] = useState<CampusGuideLocation[]>([]);

  const guideDestinationPlaces: GuideDestinationPlace[] = [
    {
      name: 'Wydział Zastosowań Informatyki i Matematyki',
      position: L.latLng(52.162, 21.046319957149112),
    },
    {
      name: 'Wydział Żywienia Człowieka',
      position: L.latLng(52.1600272, 21.044767625367818),
    },
    {
      name: 'Wydział Ekonomiczny',
      position: L.latLng(52.164620533816475, 21.049032211303714),
    },
    {
      name: 'Pomnik Juliana Ursyna Niemcewicza',
      position: L.latLng(52.16372550707966, 21.048313379287723),
    },
    {
      name: 'Centrum wodne',
      position: L.latLng(52.15898024846712, 21.049096584320072),
    },
    {
      name: 'Zwierzętarnia',
      position: L.latLng(52.158736719466816, 21.045513153076175),
    },
    {
      name: 'Biblioteka im Profesora Władysława Grabskiego',
      position: L.latLng(52.16418289431555, 21.044751405715946),
    },
  ];

  useEffect(() => {
    getPaths(
      guideDestinationPlaces.map((x) => x.position),
      route_type
    ).then((data) => {
      console.log('\n\n\n');
      console.log(data);
      console.log('\n\n\n');

      const newCampusGuidLocations = data.map((x, i) => {
        return {
          id: i + 1,
          name: guideDestinationPlaces[i].name,
          time: x.totalTime,
        };
      });
      newCampusGuidLocations.push({
        id: newCampusGuidLocations.length,
        name: guideDestinationPlaces[newCampusGuidLocations.length].name,
        time: 0,
      });
      setCampusGuideLocations(newCampusGuidLocations);
      setPathsInfo(data);
    });
  }, []);

  const PopulateWithGuideWidget = () => {
    return campusGuideLocations.length > 0 ? (
      <CampusGuide locations={campusGuideLocations} routeType={route_type} />
    ) : null;
  };

  return (
    <div className="map-container">
      {campusGuideLocations && PopulateWithGuideWidget()}

      <MapContainer
        center={MAP_CENTER}
        maxBounds={L.latLngBounds(BORDER_SW, BORDER_NE)}
        maxBoundsViscosity={MAP_MAX_BOUNDS_VISCOSITY}
        zoom={MAP_ZOOM}
        minZoom={MAP_MIN_ZOOM}
        maxZoom={MAP_MAX_ZOOM}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {pathsInfos.map((pathInfo) => (
          <Polyline positions={pathInfo.path} />
        ))}

        {guideDestinationPlaces.map((place, i) => (
          <IndexMarker position={place.position} index={i + 1} />
        ))}
      </MapContainer>
    </div>
  );
};
