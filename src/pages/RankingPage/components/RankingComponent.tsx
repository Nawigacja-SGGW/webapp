import './RankingComponent.scss';

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
      <div className="ranking-top">
        <div className="ranking-top2">
          <h2>Users with the most visits in one place:</h2>
        </div>

        <hr></hr>
        <div className="topUsers">
          {topUsers.map((user) => (
            <div className="user">
              <div className="user-position">{user.position}.</div>
              <div className="user-name">{user.name}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="ranking-user">
        <h3>Your place in the ranking:</h3>
        <div className="user-ranking">{userPosition}</div>
      </div>
    </div>
  );
}
