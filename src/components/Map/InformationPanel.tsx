import { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { MapState } from './Map.tsx';
import { PlaceObject } from '../../common/model.ts';
import { Button } from '../ui/Button/Button.tsx';
import './InformationPanel.scss';

import { Location } from '@styled-icons/evil';
import { BuildingOffice } from '@styled-icons/heroicons-outline';
import { EmailOutline } from '@styled-icons/evaicons-outline';
import { Telephone } from '@styled-icons/bootstrap';
import { InfoOutline } from '@styled-icons/evaicons-outline';

interface InformationPanelProps {
  place: PlaceObject;
  pathDistance: number;
  pathTime: number;
  isLocationSet: boolean;
  setMapState: Dispatch<SetStateAction<MapState>>;
}

type PanelState = 'details' | 'navigation';

export const InformationPanel = ({
  place,
  pathDistance,
  pathTime,
  isLocationSet,
  setMapState,
}: InformationPanelProps) => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const handleNavigateToObject = () => {
    navigate(`/home/objects/${place.id}`); // temporary, as there is no id for objects yet
  };

  const [panelState, setPanelState] = useState<PanelState>('details');
  const tryStartNavigating = () => {
    if (isLocationSet) {
      startNavigation();
    }
    // if (newState === 'details' || (newState === 'navigation' && isLocationSet))
    //   setPanelState(newState);
  };

  const startNavigation = () => {
    setMapState('navigating');
  };

  return (
    <div className="container">
      <div className="photo" />
      <div className="column-container">
        <div className="title">{place.name}</div>
        <div className="information-container">
          {/* those fields later updates from address via addressid, unless packaged inside object */}
          <div className="field">
            <Location size="22" /> Budynek nr _{' '}
          </div>
          <div className="field">
            <BuildingOffice size="22" /> ul. Nowoursynowska ___/__, 02-787 Warszawa
          </div>
          {panelState === 'details' ? (
            <>
              <div className="field">
                <EmailOutline size="18" /> _@sggw.edu.pl
              </div>
              <div className="field">
                <Telephone size="18" /> __ ___ __ __
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
              ></Button>
              <Button
                label={t('mapPage.detailsPanel.button.details')}
                size="sm"
                onClick={handleNavigateToObject}
              ></Button>
            </>
          ) : (
            <>
              <Button
                className={!isLocationSet ? 'button primary' : ''}
                label={`Start - ${Math.round(pathTime / 60)} min`}
                size="sm"
                onClick={tryStartNavigating}
                disabled={!isLocationSet}
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
