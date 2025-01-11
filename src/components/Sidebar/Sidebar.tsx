import './Sidebar.scss';
import { clsx } from 'clsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Map, Buildings } from '@styled-icons/boxicons-solid';
import { PersonFill } from '@styled-icons/bootstrap/PersonFill';
import { Settings } from '@styled-icons/evaicons-solid/Settings';
import { LogOut } from '@styled-icons/ionicons-outline/LogOut';
import { ChevronDoubleLeft, ChevronDoubleRight } from '@styled-icons/fluentui-system-filled/';
import { ChangeEvent, useCallback } from 'react';
import { useAppStore, Language } from '../../store';
import { Guide } from '@styled-icons/remix-line/Guide';
import { Podium } from '@styled-icons/ionicons-outline/Podium';
import { StackedLineChart } from '@styled-icons/material';

//todo add translations
export type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};
export const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const setLanguage = useAppStore((state) => state.setLanguage);
  const isSettingsRoute = location.pathname.includes('/settings');

  const handleLanguageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLanguage(e.target.value as Language);
    i18n.changeLanguage(e.target.value);
  };
  const handleLogout = () => {
    console.log('logout');
    navigate('/');
    //TODO implement handleLogout based on auth logic
  };

  const handleNavigateToRanking = useCallback(() => navigate('/home/rank'), [navigate]);
  const handleNavigateToStats = useCallback(() => navigate('/home/stats'), [navigate]);

  return (
    <div className={clsx('sidebar', sidebarOpen && 'sidebar--open')}>
      <div className="sidebar__container">
        <div className="sidebar__container__language-picker">
          {!isSettingsRoute ? (
            <>
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
              />{' '}
            </>
          ) : null}
        </div>
        <div className="sidebar__container__app-identity">
          <div className="sidebar__container__app-identity__heading">Logo/name</div>
          <div className="sidebar__container__app-identity__image">
            <img src="/logo.png" alt="" />
          </div>
        </div>
        <div className="sidebar__container__links">
          <Link to="/home/map" style={{ textDecoration: 'none' }}>
            <div className="sidebar__container__links__item">
              <Map size="40" fill="white" />
              <div
                className={clsx(
                  'sidebar__container__links__item__text',
                  location.pathname.includes('/map') && 'active'
                )}
              >
                {t('sideBar.link.map')}
              </div>
            </div>
          </Link>
          <Link to="/home/objects" style={{ textDecoration: 'none' }}>
            <div className="sidebar__container__links__item">
              <Buildings size="40" fill="white" />
              <div
                className={clsx(
                  'sidebar__container__links__item__text',
                  location.pathname.includes('/objects') && 'active'
                )}
              >
                {t('sideBar.link.objects')}
              </div>
            </div>
          </Link>
          <Link to="/home/guide" style={{ textDecoration: 'none' }}>
            <div className="sidebar__container__links__item">
              <Guide size="40" fill="white" />
              <div
                className={clsx(
                  'sidebar__container__links__item__text',
                  location.pathname.includes('/guide') && 'active'
                )}
              >
                {t('sideBar.link.guide')}
              </div>
            </div>
          </Link>
          <Link to="/home/profile" style={{ textDecoration: 'none' }}>
            <div className="sidebar__container__links__item">
              <PersonFill size="40" fill="white" />
              <div
                className={clsx(
                  'sidebar__container__links__item__text',
                  location.pathname.includes('/profile') && 'active'
                )}
              >
                {t('sideBar.link.profile')}
              </div>
            </div>
          </Link>
          <Link to="/home/settings" style={{ textDecoration: 'none' }}>
            <div className="sidebar__container__links__item">
              <Settings size="40" fill="white" />
              <div
                className={clsx(
                  'sidebar__container__links__item__text',
                  location.pathname.includes('/settings') && 'active'
                )}
              >
                {t('sideBar.link.settings')}
              </div>
            </div>
          </Link>
        </div>
        <button className="sidebar__container__logout" onClick={handleLogout}>
          <LogOut size="40" fill="white" />
          <div className="sidebar__container__logout__text">{t('sideBar.button.logOut')}</div>
        </button>
      </div>
      <div className="sidebar__container__footer__buttons">
        <button className="sidebar__container__button__link" onClick={handleNavigateToRanking}>
          <Podium size={30} />
        </button>
        <button className="sidebar__container__button__link" onClick={handleNavigateToStats}>
          <StackedLineChart size={30} />
        </button>
        <button className="sidebar__toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? (
            <ChevronDoubleLeft size="30" fill="white" />
          ) : (
            <ChevronDoubleRight size="30" fill="white" />
          )}
        </button>
      </div>
    </div>
  );
};
