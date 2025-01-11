import { RankingData, UserStatsResponse } from './RankingPage';

export const getRankingStatisticsMappedObj = (data: UserStatsResponse[]): RankingData => {
  const withTheHighestNumberOfVisitedPlaces = data.sort(
    (a, b) =>
      parseInt(b.statistics.uniquePlacesVisitedCount) -
      parseInt(a.statistics.uniquePlacesVisitedCount)
  );

  const longestDistanceCovered = data.sort(
    (a, b) => parseInt(b.statistics.distanceSum) - parseInt(a.statistics.distanceSum)
  );

  const mostVisitsInOnePlace = data.sort(
    (a, b) =>
      a.statistics.topFiveVisitedPlaces.length &&
      b.statistics.topFiveVisitedPlaces.length &&
      parseInt(b.statistics.topFiveVisitedPlaces[0].count) -
        parseInt(a.statistics.topFiveVisitedPlaces[0].count)
  );

  return {
    withTheHighestNumberOfVisitedPlaces,
    longestDistanceCovered,
    mostVisitsInOnePlace,
  };
};
