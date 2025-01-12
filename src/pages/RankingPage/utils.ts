import { RankingData, UserStatsResponse } from './RankingPage';

export const getRankingStatisticsMappedObj = (
  data: UserStatsResponse[],
  showTopUsers = 5
): RankingData => {
  const withTheHighestNumberOfVisitedPlaces = [...data.slice(0)]
    .sort(
      (a, b) =>
        parseInt(b.statistics.uniquePlacesVisitedCount) -
        parseInt(a.statistics.uniquePlacesVisitedCount)
    )
    .slice(0, showTopUsers);

  const longestDistanceCovered = [...data]
    .sort((a, b) => parseInt(b.statistics.distanceSum) - parseInt(a.statistics.distanceSum))
    .slice(0, showTopUsers);

  const mostVisitsInOnePlace = [...data]
    .sort(
      (a, b) =>
        a.statistics.topFiveVisitedPlaces.length &&
        b.statistics.topFiveVisitedPlaces.length &&
        parseInt(b.statistics.topFiveVisitedPlaces[0].count) -
          parseInt(a.statistics.topFiveVisitedPlaces[0].count)
    )
    .slice(0, showTopUsers);

  return {
    withTheHighestNumberOfVisitedPlaces,
    longestDistanceCovered,
    mostVisitsInOnePlace,
  };
};
