import { FormLayout } from '../../layouts/AuthorizationFormLayout/AuthorizationFormLayout';
import { Input } from '../../components/ui/Input/Input';
import { Button } from '../../components/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { EMAIL_REGEXP } from '../../utils/constans.ts';

export const RegisterPage = () => {
  const { t } = useTranslation();

  type RegistrationInputs = {
    email: string;
    userName: string;
    password: string;
    confirmPassword: string;
  };

  const {
    formState: { errors, isSubmitting, isValid },
    register,
    handleSubmit,
    setError,
    clearErrors,
  } = useForm<RegistrationInputs>();

  const onSubmit: SubmitHandler<RegistrationInputs> = (data) => {
    clearErrors();
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      setError('confirmPassword', { type: 'manual', message: 'Passwords do not match' });
    }
  };

  return (
    <FormLayout title={t('authPage.title.signup')}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="input-label">{t('authPage.labels.email')}</p>
        <Input
          placeholder="sXXXXXX@sggw.edu.pl"
          {...register('email', {
            required: 'Email is invalid',
            pattern: EMAIL_REGEXP,
          })}
        />
        {errors.email && <span className="input-error">This field is required</span>}
        <p className="input-label">{t('authPage.labels.username')}</p>
        <Input placeholder="xxxxx" {...register('userName', { required: true })} />
        {errors.userName && <span className="input-error">This field is required</span>}
        <p className="input-label">{t('authPage.labels.password')}</p>
        <Input
          placeholder="••••••••"
          type="password"
          {...register('password', { required: true })}
        />
        {errors.password && <span className="input-error">This field is required</span>}
        <p className="input-label">{t('authPage.labels.confirmPassword')}</p>
        <Input
          placeholder="••••••••"
          type="password"
          {...register('confirmPassword', { required: true })}
        />
        {errors.confirmPassword && <span className="input-error">This field is required</span>}
        {errors.confirmPassword && errors.confirmPassword && (
          <span className="input-error">{errors.confirmPassword.message}</span>
        )}
        <Button
          className="green-button"
          label={t('authPage.button.signup')}
          type="submit"
          disabled={isSubmitting || !isValid}
          primary
        />
      </form>
    </FormLayout>
  );
};
