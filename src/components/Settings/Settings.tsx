import './Settings.scss';
import { useTranslation } from 'react-i18next';

export const Settings = () => {
  const { t } = useTranslation();

  return (
    <div className="settings">
      <h1>{t('settingsPage.header')}</h1>
      <br />
      <h3>{t('settingsPage.yourData')}</h3>
      <br />
      <p>E-mail</p>
      <p>sXXXXXX@sggw.edu.pl</p>
      <br />
      <p>Username</p>
      <p>XXXXXXXX</p>
    </div>
  );
};
