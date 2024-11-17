import { Outlet } from 'react-router-dom';
import './AuthorizationLayout.scss';
import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';

export const AuthorizationLayout = () => {
  const { t, i18n } = useTranslation();
  const handleLanguageChange = (e) => {
    console.log('change');
    i18n.changeLanguage(e.target.value);
  };
  return (
    <div className="authorization-layout">
      <div className="authorization-layout__logo">
        <div className="authorization-layout__language-picker">
          <label className={clsx(i18n.language === 'pl' && 'active')} htmlFor="lang-pl">
            PL
          </label>
          /
          <input
            type="radio"
            id="lang-pl"
            name="language"
            value="pl"
            checked={i18n.language === 'pl'}
            onChange={handleLanguageChange}
            hidden
          />
          <label className={clsx(i18n.language === 'en' && 'active')} htmlFor="lang-en">
            EN
          </label>
          <input
            type="radio"
            id="lang-en"
            name="language"
            value="en"
            checked={i18n.language === 'en'}
            onChange={handleLanguageChange}
            hidden
          />
        </div>
        <div className="authorization-layout__logo-container">
          <img src="../../../public/logo.png" alt="logo" />
        </div>
      </div>
      <div className="authorization-layout__content">
        <div className="authorization-layout__logos">
          <div className="authorization-layout__logo-wrapper">
            <img src="../../../public/logo.png" alt="logo" />
          </div>
          <div className="authorization-layout__divider" />
          <div className="authorization-layout__logo-wrapper">
            <img src="../../../public/logo-sggw.png" alt="sggw" />
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
