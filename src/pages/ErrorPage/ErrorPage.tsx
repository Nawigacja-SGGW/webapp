import { PageContentWrapper } from '../../layouts/PageContentWrapper/PageContentWrapper.tsx';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button/Button.tsx';
import './ErrorPage.scss';
import { useCallback } from 'react';

export const ErrorPage = () => {
  const navigate = useNavigate();
  const handleRedirectHome = useCallback(() => {
    navigate('/home');
  }, []);

  return (
    <PageContentWrapper>
      <div className="error-page__wrapper">
        <div className="error-page__info">
          <h1>Awww snap! 😣</h1>
          <p>404 Page not found</p>
        </div>
        <Button primary onClick={handleRedirectHome} label="Back home" />
      </div>
    </PageContentWrapper>
  );
};
