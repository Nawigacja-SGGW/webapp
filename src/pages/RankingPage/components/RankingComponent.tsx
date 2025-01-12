import './RankingComponent.scss';
import { Card } from '../../../components/ui/Card/Card.tsx';
import { useTranslation } from 'react-i18next';

interface User {
  name: string;
  position: number;
}

interface RankingProps {
  topUsers: User[];
  userPosition?: number;
  title: string;
}

export function RankingComponent({ topUsers, userPosition, title }: RankingProps) {
  const containerClass =
    userPosition == null ? 'ranking-container ranking-container-extended' : 'ranking-container';
  const { t } = useTranslation();

  return (
    <div className={containerClass}>
      <Card heading={title}>
        <div className="top-users">
          {topUsers.map((user) => (
            <div className="user" key={user.position}>
              <div className="user-position">{user.position}.</div>
              <div className="user-name">{user.name}</div>
            </div>
          ))}
        </div>
      </Card>

      {userPosition != null && (
        <Card heading={t('RankingPage.rankingPlace')}>
          <div className="user-ranking">{userPosition}</div>
        </Card>
      )}
    </div>
  );
}
