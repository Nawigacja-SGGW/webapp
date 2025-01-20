import { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { MapState, Points, WarningInfo } from './Map.tsx';
import { PlaceObject } from '../../common/model.ts';
import { Button } from '../ui/Button/Button.tsx';
import './InformationPanel.scss';

import { Location } from '@styled-icons/evil';
import { BuildingOffice } from '@styled-icons/heroicons-outline';
import { EmailOutline } from '@styled-icons/evaicons-outline';
import { InfoOutline } from '@styled-icons/evaicons-outline';
import { Walk } from '@styled-icons/boxicons-regular/Walk';
import { useAppStore } from '../../store/index.ts';
import { DirectionsBike } from 'styled-icons/material-outlined';

interface InformationPanelProps {
  place: PlaceObject | null;
  pathDistance: number;
  pathTime: number;
  points: Points;
  setPoints: Dispatch<SetStateAction<Points>>;
  warningInfo: WarningInfo;
  setMapState: Dispatch<SetStateAction<MapState>>;
}

type PanelState = 'details' | 'navigation';

export const InformationPanel = ({
  place,
  pathDistance,
  pathTime,
  points,
  setPoints,
  warningInfo,
  setMapState,
}: InformationPanelProps) => {
  const { t } = useTranslation();
  const { routePreference } = useAppStore((state) => state.preferences);
  const setRoutePreference = useAppStore((state) => state.setRoutePreference);

  const handleTogglingRoute = () => {
    if (routePreference === 'bike') {
      setRoutePreference('foot');
    } else if (routePreference === 'foot') {
      setRoutePreference('bike');
    }
    setPoints((prevPoints) => ({ ...prevPoints })); // to update the path
  };

  const navigate = useNavigate();

  const handleNavigateToObject = () => {
    navigate(`/home/objects/${place?.id}`); // temporary, as there is no id for objects yet
  };

  const [panelState, setPanelState] = useState<PanelState>('details');
  const tryStartNavigating = () => {
    if (points.startingPoint) {
      startNavigation();
    }
  };

  const startNavigation = () => {
    setMapState('navigating');
  };

  return (
    <div className="container">
      <div className={place ? 'photo' : 'photo-marker'}>
        {place ? <img src={place.imageUrl ?? ''} /> : <img src="/marker-icon.png" />}
      </div>
      <div className="column-container">
        <div className="title">{place ? place.name : t('mapPage.detailsPanel.title.point')}</div>
        <div className="information-container">
          {/* those fields later updates from address via addressid, unless packaged inside object */}
          <div className="field">
            <BuildingOffice size="22" />
            {place ? `${place.name ?? ' -'}` : ' -'}
          </div>
          <div className="field">
            <Location size="22" />
            {place
              ? place.address
                ? `${t('mapPage.detailsPanel.street.prefix')} ${place.address?.street ?? '-'}, ${place.address?.postal_code ?? '-'} ${place.address?.city ?? '-'}`
                : '-'
              : `${t('mapPage.detailsPanel.street.prefix')} Nowoursynowska 161, 02-787 Warszawa`}
          </div>
          {panelState === 'details' ? (
            <>
              <div className="field">
                <EmailOutline size="18" />
                {place?.website ? ` ${place.website}` : ' -'}
              </div>
              <div className="field">
                {/* PlaceObject lacks phone field, so always null, so field unnecessary
                <Telephone size="18" />
                {" -"}
                */}
              </div>
            </>
          ) : (
            <>
              <div className="field">
                <InfoOutline size="22" /> {Math.round(pathDistance / 100) / 10} km
              </div>
              <div className="field"></div>
            </>
          )}
        </div>
        <div className="buttons-container">
          {panelState === 'details' ? (
            <>
              <Button
                label={t('mapPage.detailsPanel.button.navigate')}
                size="sm"
                onClick={() => setPanelState('navigation')}
                primary={!points.startingPoint}
                disabled={!points.startingPoint}
              ></Button>
              <Button
                label={t('mapPage.detailsPanel.button.details')}
                size="sm"
                onClick={place ? handleNavigateToObject : () => {}}
                primary={!place}
                disabled={!place}
              ></Button>

              <Button
                label={t('mapPage.detailsPanel.button.toggleRoute')}
                className="change-route-button"
                size="sm"
                onClick={place ? handleTogglingRoute : () => {}}
                primary={true}
                disabled={!place}
              >
                {routePreference === 'foot' ? <DirectionsBike size={20} /> : <Walk size={20} />}
              </Button>
            </>
          ) : (
            <>
              <Button
                label={`Start - ${Math.round(pathTime / 60)} min`}
                size="sm"
                onClick={tryStartNavigating}
                primary={!warningInfo.isOnCampus}
                disabled={!warningInfo.isOnCampus}
              ></Button>
              <Button
                label={t('mapPage.detailsPanel.button.cancel')}
                size="sm"
                onClick={() => setPanelState('details')}
              ></Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InformationPanel;
