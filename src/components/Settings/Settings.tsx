import './Settings.scss';
import { useTranslation } from 'react-i18next';

export const Settings = () => {
  const { t } = useTranslation();

  return (
    <div className="settings">
      <h1>{t('settingsPage.header')}</h1>
      <div>{t('exampleTranslation')}</div>
    </div>
  );
};
