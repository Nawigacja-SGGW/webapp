import './Sidebar.scss';
import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Map, Buildings } from '@styled-icons/boxicons-solid';
import { PersonFill } from '@styled-icons/bootstrap/PersonFill';
import { Settings } from '@styled-icons/evaicons-solid/Settings';
import { LogOut } from '@styled-icons/ionicons-outline/LogOut';
import { ChevronDoubleLeft, ChevronDoubleRight } from '@styled-icons/fluentui-system-filled/';

//todo add translations

export type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};
export const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    console.log('change');
    i18n.changeLanguage(e.target.value);
  };
  const handleLogout = () => {
    console.log('logout');
    //TODO implement handleLogout based on auth logic
  };

  return (
    <div className={clsx('sidebar', sidebarOpen && 'sidebar--open')}>
      <div className="sidebar__container">
        <div className="sidebar__container__language-picker">
          <label htmlFor="pl">PL</label>
          <input
            type="radio"
            id="pl"
            name="language"
            value="pl"
            onChange={handleLanguageChange}
            checked={i18n.language === 'pl'}
          />
          /<label htmlFor="pl">EN</label>
          <input
            type="radio"
            id="en"
            name="language"
            value="en"
            onChange={handleLanguageChange}
            checked={i18n.language === 'en'}
          />
        </div>
        <div className="sidebar__container__app-identity">
          <div className="sidebar__container__app-identity__heading">Logo/name</div>
          <div className="sidebar__container__app-identity__image">
            <img src="../../../public/assets/logo.svg" alt="" />
          </div>
        </div>
        <div className="sidebar__container__links">
          <Link to="/home/map">
            <div className="sidebar__container__links__item">
              <Map size="40" fill="white" />
              <div className="sidebar__container__links__item__text">Map</div>
            </div>
          </Link>
          <Link to="/home/objects">
            <div className="sidebar__container__links__item">
              <Buildings size="40" fill="white" />
              <div className="sidebar__container__links__item__text">Objects</div>
            </div>
          </Link>
          <Link to="/home/profile">
            <div className="sidebar__container__links__item">
              <PersonFill size="40" fill="white" />
              <div className="sidebar__container__links__item__text">Profile</div>
            </div>
          </Link>
          <Link to="/home/settings">
            <div className="sidebar__container__links__item">
              <Settings size="40" fill="white" />
              <div className="sidebar__container__links__item__text">Settings</div>
            </div>
          </Link>
        </div>
        <button className="sidebar__container__logout" onClick={handleLogout}>
          <LogOut size="40" fill="white" />
          <div className="sidebar__container__logout__text">Log out</div>
        </button>
      </div>

      <button className="sidebar__toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? (
          <ChevronDoubleLeft size="40" fill="white" />
        ) : (
          <ChevronDoubleRight size="40" fill="white" />
        )}
      </button>
    </div>
  );
};
