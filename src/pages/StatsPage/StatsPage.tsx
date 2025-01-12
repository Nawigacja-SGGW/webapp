import { StackedLineChart } from 'styled-icons/material-outlined';
import styles from './StatsPage.module.scss';
import { Card } from '../../components/ui/Card/Card.tsx';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../store';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import {
  mapObjKeys,
  ObjectsOverviewResponseDTO,
  PlaceObject,
  UserStatsResponse,
} from '../../common/model.ts';
import { camelCase } from 'lodash';

const fetchData = async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_MAIN_API_URL}/users-rankings`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new AxiosError(error.message);
    }
    throw error;
  }
};

const fetchObjects = async (): Promise<PlaceObject[]> => {
  try {
    const { data } = await axios.get<ObjectsOverviewResponseDTO>(
      `${import.meta.env.VITE_MAIN_API_URL}/objects`
    );
    return mapObjKeys([...data.point_objects, ...data.area_objects], camelCase) as PlaceObject[];
  } catch (e) {
    throw e as Error;
  }
};

export const StatsPage = () => {
  const { t } = useTranslation();
  const authData = useAppStore((state) => state.authData);
  const language = useAppStore((state) => state.preferences.language);
  const [topVisitedPlaces, setTopVisitedPlaces] = useState<
    {
      guide: { description: string; description_eng: string };
    }[]
  >([]);

  const [userData, setUserData] = useState<UserStatsResponse>();

  useEffect(() => {
    fetchData()
      .then((data) => {
        if (authData && data.users.length) {
          const userData = data.users.find((user: any) => user.user_email === authData.email);
          const mappedObj = mapObjKeys(userData, camelCase);
          setUserData(mappedObj as unknown as UserStatsResponse);
          return mappedObj;
        }
        return null;
      })
      .then((data) => {
        if (data) {
          fetchObjects().then((objects) => {
            //@ts-ignore
            const topVisitedPlacesByUser = objects
              .filter((object) =>
                (data as unknown as UserStatsResponse).statistics.topFiveVisitedPlaces
                  .map((obj) => obj.object_id)
                  .includes(object.id)
              )
              .map((obj) => obj.guide);
            setTopVisitedPlaces(topVisitedPlacesByUser.slice(0, 5));
          });
        }
      });
  }, [userData?.userId]);

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <StackedLineChart size={50} />
        <div className={styles.distanceInfo}>
          <h2>{t('statisticsPage.distanceCovered')}</h2>
          <p>{userData?.statistics.distanceSum} km</p>
        </div>
      </div>
      <div className={styles.statisticsSection}>
        <Card heading={t('statisticsPage.top5')}>
          <ol className={styles.top5list}>
            {topVisitedPlaces.length ? (
              topVisitedPlaces?.map((item) => (
                <li key={item.guide.description}>
                  {language === 'en' ? item.guide.description_eng : item.guide.description}
                </li>
              ))
            ) : (
              <p>{t('statisticsPage.emptyRanking')}</p>
            )}
          </ol>
        </Card>
        <Card heading={t('statisticsPage.numberOfVisitedLocations')}>
          <div className={styles.visitedLocations}>
            {userData?.statistics.uniquePlacesVisitedCount}
          </div>
        </Card>
      </div>
      <div className={styles.footer}></div>
    </div>
  );
};
