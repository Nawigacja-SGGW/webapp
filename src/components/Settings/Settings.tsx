import './Settings.scss';
import { useTranslation } from 'react-i18next';

export const Settings = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>Settings</h1>
      <div>{t('exampleTranslation')}</div>
    </div>
  );
};
