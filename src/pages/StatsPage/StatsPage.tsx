import { StackedLineChart } from 'styled-icons/material-outlined';
import styles from './StatsPage.module.scss';
import { Card } from '../../components/ui/Card/Card.tsx';
import { useTranslation } from 'react-i18next';

export const StatsPage = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <StackedLineChart size={50} />
        <div className={styles.distanceInfo}>
          <h2>{t('statisticsPage.distanceCovered')}</h2>
          <p>0 km</p>
        </div>
      </div>
      <div className={styles.statisticsSection}>
        <Card heading={t('statisticsPage.top5')}>
          <ol className={styles.top5list}>
            <li>WZiM</li>
            <li>WZiM</li>
            <li>WZiM</li>
            <li>WZiM</li>
            <li>WZiM</li>
          </ol>
        </Card>
        <Card heading={t('statisticsPage.numberOfVisitedLocations')}>
          <div className={styles.visitedLocations}>5</div>
        </Card>
      </div>
      <div className={styles.footer}></div>
    </div>
  );
};
