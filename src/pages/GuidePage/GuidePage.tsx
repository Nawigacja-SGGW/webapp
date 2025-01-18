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
import { getObjectsList } from '../../utils';

type GuideDestinationPlace = {
  name: string;
  position: L.LatLng;
};

export const GuidePage = () => {
  const route_type = useAppStore((state: AppState) => state.preferences.routePreference);
  const [guideDestinationPlaces, setGuideDestinationPlaces] = useState<GuideDestinationPlace[]>([]);
  const [pathsInfos, setPathsInfo] = useState<PathInfo[]>([]);
  const [campusGuideLocations, setCampusGuideLocations] = useState<CampusGuideLocation[]>([]);
  const includedLocationsIds = new Set([2, 5, 6, 48, 50, 11]);

  const fetchAllLocations = async () => {
    const data = await getObjectsList();
    if (Array.isArray(data)) {
      return data;
    }
    return [];
  };

  useEffect(() => {
    getGuideData();
  }, []);

  const getGuideData = async () => {
    const allLocations_ = await fetchAllLocations();
    const filteredLocations = allLocations_.slice(1).filter((x) => includedLocationsIds.has(x.id));
    const guideDestinationPlaces_ = filteredLocations.map(
      (x) =>
        ({
          name: x.name,
          position: L.latLng(Number(x.latitude), Number(x.longitude)),
        }) as GuideDestinationPlace
    );

    setGuideDestinationPlaces(guideDestinationPlaces_);
  };

  useEffect(() => {
    getPaths(
      guideDestinationPlaces.map((x) => x.position),
      route_type
    ).then((data) => {
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
  }, [guideDestinationPlaces]);

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
