import { Button } from '../ui/Button/Button.tsx';
import './InformationPanel.scss';

export const InformationPanel = () => {
  return (
    <div className="container">
      <div className="photo" />
      <div className="column-container">
        <div className="title">
          Wydział Budownictwa i Inżynierii Środowiska Szkoły Głównej Gospodarstwa Wiejskiego
        </div>
        <div className="information-container">
          <div className="field">[__] Budynek nr 33</div>
          <div className="field">[__] ul. Nowoursynowska 161/33, 02-787 Warszawa</div>
          <div className="field">[__] dwbis@sggw.edu.pl</div>
          <div className="field">[__] 22 593 50 10</div>
        </div>
        <div className="buttons-container">
          <Button label="Navigate" size="sm"></Button>
          <Button label="Details" size="sm"></Button>
        </div>
      </div>
    </div>
  );
};

export default InformationPanel;
