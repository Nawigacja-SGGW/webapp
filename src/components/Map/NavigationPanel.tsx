import { Button } from '../ui/Button/Button.tsx';
import './NavigationPanel.scss';

interface NavigationPanelProps {
  timeLeft: number;
  distanceLeft: number;
  direction: string;
}

export const NavigationPanel = ({ timeLeft, distanceLeft, direction }: NavigationPanelProps) => {
  return (
    <div className="container">
      <div className="details-container">
        <h1>{timeLeft}</h1>
        <h1>{distanceLeft}</h1>
      </div>

      <div className="direction-container">
        <h2>{direction}</h2>
      </div>

      <div className="button-container">
        <Button label="Cancel" size="sm" onClick={() => {}}></Button>
      </div>
    </div>
  );
};

export default NavigationPanel;
