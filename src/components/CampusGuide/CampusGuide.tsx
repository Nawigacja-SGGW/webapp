import LocationItem from './LocationItem';
import { useTranslation } from 'react-i18next';
import './CampusGuide.scss';

export type CampusGuideLocation = {
  id: number;
  name: string;
  time: number;
};

// const locations = [
//   { id: 1, name: 'SGGW Agricultural University Library', time: '5 min' },
//   { id: 2, name: 'Informatics and Econometrics Building', time: '15 min' },
//   { id: 3, name: 'SGGW Swimming Pool', time: '5 min' },
//   { id: 4, name: 'SGGW Swimming Pool 2', time: '5 min' },
//   { id: 5, name: 'SGGW Swimming Pool 3', time: '5 min' },
//   { id: 6, name: 'SGGW Swimming Pool', time: '5 min' },
//   { id: 7, name: 'SGGW Swimming Pool 2', time: '5 min' },
//   { id: 8, name: 'SGGW Swimming Pool 3', time: '5 min' },
// ];

export const CampusGuide = ({
  locations,
  routeType,
}: {
  locations: CampusGuideLocation[];
  routeType: string;
}) => {
  const { t } = useTranslation();
  const totalTime = locations.reduce((prev, curr) => prev + curr.time, 0);

  return (
    <div className="campusGuideContainer">
      <div className="borderContainer">
        <div className="contentContainer">
          <h1>{t('CampusGuide.title')}</h1>
          <p className="info">{t('CampusGuide.info')}</p>
          <p className="estimate">Estimated walking time: {Math.round(totalTime / 100)} min</p>
          <div className="locations">
            {locations.map((location, index) => (
              <LocationItem
                key={location.id}
                stepNumber={index + 1}
                locationName={location.name}
                time={location.time}
                travelType={routeType}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CampusGuide;
