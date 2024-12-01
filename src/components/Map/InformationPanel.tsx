import axios from 'axios';
import { useCallback, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ObjectData } from '../../models';
import { Button } from '../ui/Button/Button.tsx';
import './InformationPanel.scss';

export const InformationPanel = ({ data }: { data: ObjectData }) => {
  // const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigateToObject = useCallback(() => {
    navigate(`/home/objects/${data.addressId}`);
  }, []);

  return (
    <div className="container">
      <div className="photo" />
      <div className="column-container">
        <div className="title">{data.name}</div>
        <div className="information-container">
          <div className="field">[__] Budynek nr _ </div>
          <div className="field">[__] ul. Nowoursynowska ___/__, 02-787 Warszawa</div>
          <div className="field">[__] _@sggw.edu.pl</div>
          <div className="field">[__] __ ___ __ __</div>
        </div>
        <div className="buttons-container">
          <Button label="Navigate" size="sm"></Button>
          <Button label="Details" size="sm" onClick={handleNavigateToObject}></Button>
        </div>
      </div>
    </div>
  );
};

export default InformationPanel;
