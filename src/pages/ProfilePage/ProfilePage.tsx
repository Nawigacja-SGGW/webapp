import { PageContentWrapper } from '../../layouts/PageContentWrapper/PageContentWrapper.tsx';
import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '../../components/ui/Button/Button.tsx';
// import { useCallback } from 'react';
// import { useTranslation } from 'react-i18next';
import { demo_users, User } from '../../mocks/users.ts';
import './ProfilePage.scss';

export function ProfilePage() {
  const [profileData, setProfileData] = useState<User | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Symulacja opóźnienia
      setProfileData(demo_users[0]); // Po załadowaniu dane demo_users
    };

    fetchProfileData();
  }, []);

  return (
    <PageContentWrapper>
      <div className="profile-page__content">
        <h1 className="profile-page__header">Your profile</h1>
        {profileData ? (
          <img className="profile-page__image" src={profileData.image} alt="User's profile"></img>
        ) : (
          <div className="profile-page__image"></div>
        )}
      </div>
    </PageContentWrapper>
  );
}
