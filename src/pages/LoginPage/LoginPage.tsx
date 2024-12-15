import { FormLayout } from '../../layouts/AuthorizationFormLayout/AuthorizationFormLayout';
import { Input } from '../../components/ui/Input/Input';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button/Button';
import { useTranslation } from 'react-i18next';

export const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleNavigateToRegisterPage = useCallback(() => {
    navigate(`/register`);
  }, []);

  const signIn = () => {
    //TODO create logic
    setTimeout(() => {
      navigate('/home/map');
    }, 1000);
  };
  const handleNavigateToForgotPassword = useCallback(() => {
    navigate(`/forgot-password`);
  }, []);

  return (
    <FormLayout title={t('authPage.title.signin')}>
      <p className="input-label">{t('authPage.labels.usernameOrEmail')}</p>
      <Input placeholder="sXXXXXX@sggw.edu.pl" />
      <p className="input-label">{t('authPage.labels.password')}</p>
      <Input placeholder="••••••••" type="password" />
      <p onClick={handleNavigateToForgotPassword} className="forgot-password">
        {t('authPage.forgotPassword')}
      </p>
      <Button className="green-button" label={t('authPage.button.signin')} onClick={signIn} />
      <p className="dont-have-account-yet">{t('authPage.noAccount')}</p>
      <Button
        className="black-button"
        label={t('authPage.button.signup')}
        onClick={handleNavigateToRegisterPage}
      />
      <hr className="login-line"></hr>
    </FormLayout>
  );
};
