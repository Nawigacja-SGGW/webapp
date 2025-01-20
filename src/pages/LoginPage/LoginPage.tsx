import { FormLayout } from '../../layouts/AuthorizationFormLayout/AuthorizationFormLayout';
import { Input } from '../../components/ui/Input/Input';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signInRequest } from '../../auth.ts';
import { useAppStore } from '../../store';
import { AxiosError } from 'axios';

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
  const setAuthData = useAppStore((state) => state.setAuthData);

  const {
    formState: { errors },
    register,
    handleSubmit,
    setError,
    clearErrors,
  } = useForm<LoginInputs>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    clearErrors();
    if (data && data.password && data.userName) {
      try {
        const response = await signInRequest(data.userName, data.password);
        if (response && response.data.code === 200) {
          setAuthData({
            token: response.data.token,
            id: response.data.id,
            email: data.userName,
          });
          navigate('/home/map');
          ``;
        }
      } catch (e) {
        if ((e as AxiosError).status === 400) {
          setError('root.invalidCredentials', {
            type: 'custom',
            message: t('authPage.validation.invalidCredentials'),
          });
        } else alert(t('authPage.failed'));
      }
    }
  };

  const handleNavigateToForgotPassword = useCallback(() => {
    navigate(`/forgot-password`);
  }, []);

  return (
    <FormLayout title={t('authPage.title.signin')}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="input-label">{t('authPage.labels.usernameOrEmail')}</p>
        <Input
          {...register('userName', {
            required: true,
          })}
        />
        {errors.userName && (
          <span className="input-error">{t('authPage.validation.required')}</span>
        )}
        <p className="input-label">{t('authPage.labels.password')}</p>
        <Input
          type="password"
          {...register('password', {
            required: true,
          })}
        />
        {errors.password && (
          <span className="input-error">{t('authPage.validation.required')}</span>
        )}
        {errors.root?.invalidCredentials && (
          <span className="input-error">{t('authPage.validation.invalidCredentials')}</span>
        )}
        <p onClick={handleNavigateToForgotPassword} className="forgot-password">
          {t('authPage.forgotPassword')}
        </p>
        <Button type="submit" className="green-button" label={t('authPage.button.signin')} />
        <p className="dont-have-account-yet">{t('authPage.noAccount')}</p>
        <Button
          className="black-button"
          label={t('authPage.button.signup')}
          onClick={handleNavigateToRegisterPage}
        />
        <hr className="login-line"></hr>
      </form>
    </FormLayout>
  );
};
