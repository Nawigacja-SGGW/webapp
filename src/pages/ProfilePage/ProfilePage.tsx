import { PageContentWrapper } from '../../layouts/PageContentWrapper/PageContentWrapper.tsx';
// import { profileImage } from '../../App.tsx';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '../../components/ui/Button/Button.tsx';
// import { useCallback } from 'react';
// import { useTranslation } from 'react-i18next';
import './ProfilePage.scss';

export function ProfilePage({}) {
  return (
    <PageContentWrapper>
      <div className="profile-page__content">
        <h1 className="profile-page__header">Your profile</h1>
        {/* {profileImage ? (
          <img className="profile-page__image" src={profileImage} alt="User's profile"></img>
        ) : (
          <div className="profile-page__placeholder"></div>
        )} */}

        <div className="profile-page__image"></div>
      </div>
    </PageContentWrapper>
  );
}
