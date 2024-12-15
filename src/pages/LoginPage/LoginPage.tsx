import { FormLayout } from '../../layouts/AuthorizationFormLayout/AuthorizationFormLayout';
import { Input } from '../../components/ui/Input/Input';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

interface LoginInputs {
  userName: string;
  password: string;
}

export const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleNavigateToRegisterPage = useCallback(() => {
    navigate(`/register`);
  }, []);

  const {
    formState: { errors },
    register,
  } = useForm<LoginInputs>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

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
      <Input
        {...register('userName', {
          required: true,
        })}
      />
      {errors.userName && <span className="input-error">{t('authPage.validation.required')}</span>}
      <p className="input-label">{t('authPage.labels.password')}</p>
      <Input
        type="password"
        {...register('password', {
          required: true,
        })}
      />
      {errors.password && <span className="input-error">{t('authPage.validation.required')}</span>}
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
