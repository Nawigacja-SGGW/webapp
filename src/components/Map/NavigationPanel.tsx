import { Dispatch, SetStateAction } from 'react';
import { MapState } from './Map.tsx';
import { Button } from '../ui/Button/Button.tsx';
import { PathInfo } from './utils.ts';
import './NavigationPanel.scss';

interface NavigationPanelProps {
  pathInfo: PathInfo;
  setMapState: Dispatch<SetStateAction<MapState>>;
}

export const NavigationPanel = ({ pathInfo, setMapState }: NavigationPanelProps) => {
  return (
    <div className="container">
      <div className="details-container">
        <h1>{Math.round(pathInfo.totalTime / 60)} min</h1>
        <h2>{pathInfo.totalDistance} m</h2>
      </div>

      <div className="direction-container">
        <h1>
          {pathInfo.direction} straight {pathInfo.distanceUntillNextDirection} m
        </h1>
        <h2>Then {pathInfo.nextDirection}</h2>
      </div>

      <div className="button-container">
        <Button label="Cancel" size="sm" onClick={() => setMapState('browsing')}></Button>
      </div>
    </div>
  );
};

export default NavigationPanel;
