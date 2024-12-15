import { PageContentWrapper } from '../../layouts/PageContentWrapper/PageContentWrapper.tsx';
import { useState, useEffect } from 'react';
import './ProfilePage.scss';
import axios from 'axios';

export function ProfilePage() {
  const [email, setEmail] = useState<string | null>(null);
  const [traveledKm, setTraveledKm] = useState<number | null>(null);
  const [designatedRoutes, setDesignatedRoutes] = useState<number | null>(null);
  const [_, setError] = useState<string | null>(null);

  const apiUrl = import.meta.env.VITE_PUBLIC_API_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/all-users`);
        if (response.data?.user?.length > 0) {
          const currentUser = response.data.user[1];

          setEmail(currentUser.email || 'Email not found');
          setTraveledKm(currentUser.distance_sum || 0);
          setDesignatedRoutes(currentUser.user_object_search.length);
        } else {
          setError('No user found');
        }
      } catch (err) {
        console.error('Error fetching user data', err);
        setError('Failed to load user data');
      }
    };

    fetchUserData();
  }, [apiUrl]);

  return (
    <PageContentWrapper>
      <div className="profile-page">
        <h1 className="profile-page__heading">Your profile</h1>
        <div className="profile-page__content">
          <div className="profile-page__info-item">
            <p className="profile-page__info-label">Email</p>
            <p className="profile-page__info-value">{email || 'Loading...'}</p>
          </div>
          <div className="profile-page__info-item">
            <p className="profile-page__info-label">Number of traveled km</p>
            <p className="profile-page__info-value">{traveledKm + 'km' || 'Loading...'}</p>
          </div>
          <div className="profile-page__info-item">
            <p className="profile-page__info-label">Number of designated routes</p>
            <p className="profile-page__info-value">{designatedRoutes || 'Loading...'}</p>
          </div>
        </div>
      </div>
    </PageContentWrapper>
  );
}
