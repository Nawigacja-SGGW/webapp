import { FormLayout } from '../../layouts/AuthorizationFormLayout/AuthorizationFormLayout';
import { Input } from '../../components/ui/Input/Input';
import { Button } from '../../components/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { EMAIL_REGEXP } from '../../utils/constans.ts';
import { signInRequest, signUpRequest } from '../../auth.ts';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store';
import { AxiosError } from 'axios';

//todo: api nie przyjmuje username, tymczasowo usuwam input
interface RegistrationInputs {
  email: string;
  //userName: string;
  password: string;
  confirmPassword: string;
}

export const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setAuthData = useAppStore((state) => state.setAuthData);

  const {
    control,
    formState: { errors, isValid, isSubmitting },
    register,
    handleSubmit,
    setError,
    clearErrors,
  } = useForm<RegistrationInputs>({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<RegistrationInputs> = async (data) => {
    clearErrors();
    if (data && data.password && data.email) {
      try {
        const response = await signUpRequest(data.email, data.password);
        if (response && response.data.code === 201) {
          const signInResponse = await signInRequest(data.email, data.password);
          if (signInResponse) {
            setAuthData({
              token: response.data.token,
              id: response.data.id,
              email: data.email,
            });
            navigate('/home/map');
            ``;
          }
        }
      } catch (e) {
        if ((e as AxiosError).status === 400) {
          setError('root.emailTaken', {
            type: 'custom',
            message: t('authPage.validation.emailTaken'),
          });
        } else alert(t('authPage.failed'));
      }
    }
  };

  const passwordField = useWatch({ control, name: 'password' });

  return (
    <FormLayout title={t('authPage.title.signup')}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="input-label">{t('authPage.labels.email')}</p>
        <Input
          {...register('email', {
            required: true,
            pattern: {
              value: EMAIL_REGEXP,
              message: t('authPage.validation.invalidEmail'),
            },
          })}
        />
        {errors.email ? (
          errors.email.type === 'required' ? (
            <span className="input-error">{t('authPage.validation.required')}</span>
          ) : errors.email.type === 'pattern' ? (
            <span className="input-error">{t('authPage.validation.invalidEmail')}</span>
          ) : null
        ) : null}
        {/*        <p className="input-label">{t('authPage.labels.username')}</p>
        <Input {...register('userName', { required: true })} />
        {errors.userName?.type === 'required' && (
          <span className="input-error">{t('authPage.validation.required')}</span>
        )}*/}
        <p className="input-label">{t('authPage.labels.password')}</p>
        <Input type="password" {...register('password', { required: true })} />
        {errors.password?.type === 'required' && (
          <span className="input-error">{t('authPage.validation.required')}</span>
        )}
        <p className="input-label">{t('authPage.labels.confirmPassword')}</p>
        <Input
          type="password"
          {...register('confirmPassword', {
            required: true,
            validate: (value) =>
              !passwordField ||
              value === passwordField ||
              t('authPage.validation.passwordNotMatch'),
          })}
        />
        {errors.confirmPassword?.type === 'required' && (
          <span className="input-error">{t('authPage.validation.required')}</span>
        )}
        {errors.confirmPassword?.type === 'validate' && (
          <span className="input-error">{errors.confirmPassword.message}</span>
        )}
        {errors.root?.emailTaken && (
          <span className="input-error">{errors.root.emailTaken.message}</span>
        )}
        <Button
          className="green-button"
          label={t('authPage.button.signup')}
          type="submit"
          primary
          disabled={!isValid || isSubmitting}
        />
      </form>
    </FormLayout>
  );
};
