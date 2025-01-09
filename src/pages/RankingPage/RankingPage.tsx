import { RankingComponent } from './components/RankingComponent';
import './RankingPage.scss';
import { Podium } from '@styled-icons/ionicons-outline/Podium';

// Dane wejściowe
const topUsers = [
  { name: 'Anna Nowak', position: 1 },
  { name: 'Krzysztof Kowalski', position: 2 },
  { name: 'Natalia Motyl', position: 3 },
  { name: 'Michał Michałowski', position: 4 },
  { name: 'Piotr Piotrowski', position: 5 },
];

const userPosition = 8; // Pozycja aktualnego użytkownika

export function RankingPage() {
  return (
    <div className="Main">
      <div className="Icon">
        <Podium size={80} />
      </div>
      <div className="RankingComponent">
        <RankingComponent topUsers={topUsers} userPosition={userPosition} />
        <RankingComponent topUsers={topUsers} userPosition={userPosition} />
        <RankingComponent topUsers={topUsers} userPosition={userPosition} />
      </div>
    </div>
  );
}
