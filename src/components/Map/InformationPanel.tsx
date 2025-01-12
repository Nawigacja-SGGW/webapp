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
  place: PlaceObject | null;
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
    navigate(`/home/objects/${place?.id}`); // temporary, as there is no id for objects yet
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
        <div className="title">{place ? place.name : t('mapPage.detailsPanel.title.point')}</div>
        <div className="information-container">
          {/* those fields later updates from address via addressid, unless packaged inside object */}
          <div className="field">
            <Location size="22" />
            {place ? `${place.name}` : t('mapPage.detailsPanel.nonApplicable')}
          </div>
          <div className="field">
            <BuildingOffice size="22" />
            {place?.address
              ? `${t('mapPage.detailsPanel.street.prefix')} ${place.address?.street}, ${place.address?.postal_code} ${place.address?.city}`
              : t('mapPage.detailsPanel.nonApplicable')}
          </div>
          {panelState === 'details' ? (
            <>
              <div className="field">
                <EmailOutline size="18" />
                {place?.website ? `${place.website}` : t('mapPage.detailsPanel.nonApplicable')}
              </div>
              <div className="field">
                <Telephone size="18" />
                {t('mapPage.detailsPanel.nonApplicable')}
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
                onClick={place ? handleNavigateToObject : () => {}}
                primary={place ? false : true}
                disabled={place ? false : true}
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
