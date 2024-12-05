import axios from 'axios';
import { Dispatch, SetStateAction, useState } from 'react';
// import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { MapState } from './Map.tsx';
import { ObjectData } from '../../models';
import { Button } from '../ui/Button/Button.tsx';
import './InformationPanel.scss';

interface InformationPanelProps {
  data: ObjectData;
  pathDistance: number;
  pathTime: number;
  isLocationSet: boolean;
  setMapState: Dispatch<SetStateAction<MapState>>;
}

type PanelState = 'details' | 'navigation';

export const InformationPanel = ({
  data,
  pathDistance,
  pathTime,
  isLocationSet,
  setMapState,
}: InformationPanelProps) => {
  // const { t } = useTranslation();
  const navigate = useNavigate();
  const handleNavigateToObject = () => {
    navigate(`/home/objects/${data.addressId}`); // temporary, as there is no id for objects yet
  };

  const [panelState, setPanelState] = useState<PanelState>('details');
  const TrySetPanelState = (newState: PanelState) => {
    if (newState === 'details' || (newState === 'navigation' && isLocationSet))
      setPanelState(newState);
  };

  const startNavigation = () => {
    setMapState('navigating');
  };

  return (
    <div className="container">
      <div className="photo" />
      <div className="column-container">
        <div className="title">{data.name}</div>
        <div className="information-container">
          {/* those fields later updates from address via addressid, unless packaged inside object */}
          <div className="field">[__] Budynek nr _ </div>
          <div className="field">[__] ul. Nowoursynowska ___/__, 02-787 Warszawa</div>
          {panelState === 'details' ? (
            <>
              <div className="field">[__] _@sggw.edu.pl</div>
              <div className="field">[__] __ ___ __ __</div>
            </>
          ) : (
            <>
              <div className="field">[__] {Math.round(pathDistance / 100) / 10} km</div>
              <div className="field"></div>
            </>
          )}
        </div>
        <div className="buttons-container">
          {panelState === 'details' ? (
            <>
              <Button
                label="Navigate"
                size="sm"
                onClick={() => TrySetPanelState('navigation')}
              ></Button>
              <Button label="Details" size="sm" onClick={handleNavigateToObject}></Button>
            </>
          ) : (
            <>
              <Button
                label={`Start - ${Math.round(pathTime / 60)} min`}
                size="sm"
                onClick={startNavigation}
              ></Button>
              <Button label="Cancel" size="sm" onClick={() => setPanelState('details')}></Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InformationPanel;
