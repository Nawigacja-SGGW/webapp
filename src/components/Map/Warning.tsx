import { WarningType } from './Map.tsx';

import { WifiOffOutline } from '@styled-icons/evaicons-outline';
import { LocationOff } from '@styled-icons/material';

import './Warning.scss';

interface WarningSelectProps {
  type: WarningType;
}

export const Warning = ({ type }: WarningSelectProps) => {
  return (
    <div className="warning-container">
      {type == 'connection' ? (
        <>
          <WifiOffOutline size="22" /> Reconnecting...
        </>
      ) : type == 'location' ? (
        <>
          <LocationOff size="22" /> Location not found!
        </>
      ) : type == 'distance' ? (
        <>
          <LocationOff size="22" /> Not on campus!
        </>
      ) : (
        '-'
      )}
    </div>
  );
};

export default Warning;
