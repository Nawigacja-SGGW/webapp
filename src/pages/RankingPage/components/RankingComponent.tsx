import './RankingComponent.scss';
import { Card } from '../../../components/ui/Card/Card.tsx';

interface User {
  name: string;
  position: number;
}

interface RankingProps {
  topUsers: User[];
  userPosition: number;
}

export function RankingComponent({ topUsers, userPosition }: RankingProps) {
  return (
    <div className="ranking-container">
      <Card heading="Users with the most visits in one place">
        <div className="top-users">
          {topUsers.map((user) => (
            <div className="user">
              <div className="user-position">{user.position}.</div>
              <div className="user-name">{user.name}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card heading="Your place in the ranking:">
        <div className="user-ranking">{userPosition}</div>
      </Card>
    </div>
  );
}
