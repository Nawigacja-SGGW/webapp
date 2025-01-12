import { RankingComponent } from './components/RankingComponent';
import './RankingPage.scss';
import { Podium } from '@styled-icons/ionicons-outline/Podium';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { mapObjKeys, UserStatsResponseDTO } from '../../common/model';
import { camelCase } from 'lodash';
import { getRankingStatisticsMappedObj } from './utils';
import { t } from 'i18next';

interface TopVisitedPlace {
  objectId: string;
  count: string;
}

interface UserStatistics {
  distanceSum: string;
  uniquePlacesVisitedCount: string;
  topFiveVisitedPlaces: TopVisitedPlace[];
}

export interface UserStatsResponse {
  userId: string;
  userEmail: string;
  statistics: UserStatistics;
}

export interface UsersStatsResponseDTO {
  code: number;
  users: UserStatsResponseDTO[];
}

export interface RankingData {
  withTheHighestNumberOfVisitedPlaces: UserStatsResponse[];
  longestDistanceCovered: UserStatsResponse[];
  mostVisitsInOnePlace: UserStatsResponse[];
}

export function RankingPage() {
  const [userRankingsData, setUserRankingsData] = useState<RankingData>();

  useEffect(() => {
    const fetchTopUsers = async (): Promise<UsersStatsResponseDTO> => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_MAIN_API_URL}/users-rankings`);
        return data;
      } catch (e) {
        throw e;
      }
    };

    fetchTopUsers()
      .then((data) => data && data.users.map((obj) => mapObjKeys(obj, camelCase)))
      .then((data) => getRankingStatisticsMappedObj(data as unknown as UserStatsResponse[]))
      .then((data) => setUserRankingsData(data));
  }, []);

  return (
    <div className="main">
      <div className="topbar">
        <Podium size={80} />
      </div>
      <div className="rankings">
        <RankingComponent
          data={userRankingsData?.mostVisitsInOnePlace}
          title={t('rankingPage.component.mostVisitsInOnePlace')}
        />
        <RankingComponent
          data={userRankingsData?.withTheHighestNumberOfVisitedPlaces}
          title={t('rankingPage.component.withTheHighestNumberOfVisitedPlaces')}
        />
        <RankingComponent
          data={userRankingsData?.longestDistanceCovered}
          title={t('rankingPage.component.longestDistanceCovered')}
        />
      </div>
    </div>
  );
}
