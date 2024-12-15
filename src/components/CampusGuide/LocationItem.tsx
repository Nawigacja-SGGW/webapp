import './LocationItem.scss';
import { Walk } from '@styled-icons/boxicons-regular/Walk';
import { DirectionsBike } from 'styled-icons/material-outlined';

interface StepProps {
  stepNumber: number;
  locationName: string;
  time: string;
  travelType: string;
}

const LocationItem = ({ stepNumber, locationName, time, travelType }: StepProps) => (
  <div className="contentBox">
    <div className="information">
      <div className="number">{stepNumber}</div>
      <div className="locationName">{locationName}</div>
    </div>

    <div className="detailContainer">
      <div className="lineBox"></div>
      <div className="travelTime">
        {travelType === 'walk' ? <Walk size={40} /> : <DirectionsBike size={40} />}
        <span className="time">{time}</span>
      </div>
    </div>
  </div>
);

export default LocationItem;
