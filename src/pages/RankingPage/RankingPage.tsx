import './RankingPage.scss';
import { RankingComponent } from './components/RankingComponent';
import { useTranslation } from 'react-i18next';
import { Podium } from '@styled-icons/ionicons-outline/Podium';

const topUsers = [
  { name: 'Anna Nowak', position: 1 },
  { name: 'Krzysztof Kowalski', position: 2 },
  { name: 'Natalia Motyl', position: 3 },
  { name: 'Michał Michałowski', position: 4 },
  { name: 'Piotr Piotrowski', position: 5 },
];

const userPosition = 8;

export function RankingPage() {
  const { t } = useTranslation();
  return (
    <div className="main">
      <div className="topbar">
        <Podium className="icon" />
      </div>
      <div className="rankings">
        <div className="rankings-top">
          <div>
            <RankingComponent
              topUsers={topUsers}
              userPosition={userPosition}
              title={t('RankingPage.user.onePlace')}
            />
          </div>
          <div>
            <RankingComponent
              topUsers={topUsers}
              userPosition={userPosition}
              title={t('RankingPage.user.mostPlaces')}
            />
          </div>
          <div>
            <RankingComponent
              topUsers={topUsers}
              userPosition={userPosition}
              title={t('RankingPage.user.longestDistance')}
            />
          </div>
        </div>
        <div className="rankings-bot">
          <RankingComponent topUsers={topUsers} title={t('RankingPage.campus.mostPlaces')} />
        </div>
      </div>
    </div>
  );
}
