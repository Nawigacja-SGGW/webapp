import { Dispatch, SetStateAction } from 'react';
import { MapState } from './Map.tsx';
import { Button } from '../ui/Button/Button.tsx';
import { PathInfo } from './utils.ts';
import './NavigationPanel.scss';

import { Arrow90degLeft, Arrow90degRight, ArrowUp } from '@styled-icons/bootstrap';
import { Walk } from '@styled-icons/boxicons-regular';
import { DirectionsBike } from '@styled-icons/material-outlined';

interface NavigationPanelProps {
  pathInfo: PathInfo;
  setMapState: Dispatch<SetStateAction<MapState>>;
}

export const NavigationPanel = ({ pathInfo, setMapState }: NavigationPanelProps) => {
  const GetManeuverSymbol = () => {
    switch (pathInfo.nextManeuver) {
      case 'continue':
        if (pathInfo.nextManeuverModifier === 'straight') {
          return <ArrowUp size="40" />;
        }
        return <></>;
      case 'turn':
        switch (pathInfo.nextManeuverModifier) {
          case 'sharp left':
          case 'left':
          case 'slight left':
            return <Arrow90degLeft size="40" />;
          case 'sharp right':
          case 'right':
          case 'slight right':
            return <Arrow90degRight size="40" />;
        }
    }
    return 2;
  };

  return (
    <div className="container">
      <div className="details-container">
        <h3>{Math.round(pathInfo.totalTime / 60)} min</h3>
        <h3>
          {pathInfo.totalDistance >= 1000
            ? Math.round(pathInfo.totalDistance / 100) / 10 + ' km'
            : pathInfo.totalDistance + ' m'}
        </h3>
      </div>

      <div className="direction-container">
        <div className="direction-symbol-container">{GetManeuverSymbol()}</div>
        <div className="direction-text-container">
          <h1>
            {pathInfo.transportationMode} straight {pathInfo.distanceUntillNextDirection} m
          </h1>
          <h2>
            Then {pathInfo.nextManeuver} {pathInfo.nextManeuverModifier}
          </h2>
        </div>
      </div>

      <div className="right-container">
        <div className="mode-symbol-container">
          {pathInfo.transportationMode === 'Walk' ? (
            <Walk size="40" />
          ) : (
            <DirectionsBike size="40" />
          )}
        </div>
        <Button label="Cancel" size="sm" onClick={() => setMapState('browsing')}></Button>
      </div>
    </div>
  );
};

export default NavigationPanel;
