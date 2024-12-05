import { PathInfo } from './utils.ts';
import { Button } from '../ui/Button/Button.tsx';
import './NavigationPanel.scss';

export const NavigationPanel = ({ pathInfo }: { pathInfo: PathInfo }) => {
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
        <Button label="Cancel" size="sm" onClick={() => {}}></Button>
      </div>
    </div>
  );
};

export default NavigationPanel;
