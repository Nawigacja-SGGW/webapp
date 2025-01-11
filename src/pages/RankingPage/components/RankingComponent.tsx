import './RankingComponent.scss';
import { Card } from '../../../components/ui/Card/Card.tsx';
import { useTranslation } from 'react-i18next';
import { UserStatsResponse } from '../RankingPage.tsx';

interface RankingProps {
  data: UserStatsResponse[] | undefined;
  title: string;
}

export function RankingComponent({ data, title }: RankingProps) {
  const { t } = useTranslation();
  return (
    <div className="ranking-container">
      <Card heading={title}>
        <div className="top-users">
          {data ? (
            data.map((record, idx: number) => (
              <div className="user">
                <div className="user-position">{idx + 1}</div>
                <div className="user-name">{record.userEmail}</div>
              </div>
            ))
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </Card>
      <Card heading={t('rankingPage.component.placeInTheRanking')}>
        {/* //TODO we have to implement current user place in ranking (store stats in zustand store or sth) */}
        <div className="user-ranking">{1}</div>
      </Card>
    </div>
  );
}
