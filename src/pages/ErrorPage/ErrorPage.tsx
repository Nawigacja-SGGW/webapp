import { PageContentWrapper } from '../../layouts/PageContentWrapper/PageContentWrapper.tsx';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button/Button.tsx';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import './ErrorPage.scss';

export const ErrorPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleRedirectHome = useCallback(() => {
    navigate('/home');
  }, []);

  return (
    <PageContentWrapper>
      <div className="error-page__wrapper">
        <div className="error-page__info">
          <h1>{t('errorPage.header')}</h1>
          <p>{t('errorPage.subheader')}</p>
        </div>
        <Button primary onClick={handleRedirectHome} label={t('errorPage.button.label')} />
      </div>
    </PageContentWrapper>
  );
};
