import { FormLayout } from '../../layouts/AuthorizationFormLayout/AuthorizationFormLayout';
import { Input } from '../../components/ui/Input/Input';
import { Button } from '../../components/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { EMAIL_REGEXP } from '../../utils/constans.ts';
import { useEffect } from 'react';

export const RegisterPage = () => {
  const { t } = useTranslation();

  type RegistrationInputs = {
    email: string;
    userName: string;
    password: string;
    confirmPassword: string;
  };

  const {
    control,
    formState: { errors, isValid, isSubmitting },
    register,
    handleSubmit,
  } = useForm<RegistrationInputs>({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<RegistrationInputs> = (data) => {
    console.log(data);
  };

  // testing purposes
  useEffect(() => {
    console.log(errors);
  });

  const passwordField = useWatch({ control, name: 'password' });

  return (
    <FormLayout title={t('authPage.title.signup')}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="input-label">{t('authPage.labels.email')}</p>
        <Input
          {...register('email', {
            required: 'Email is invalid',
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
            <span className="input-error">{errors.email.message}</span>
          ) : null
        ) : null}
        <p className="input-label">{t('authPage.labels.username')}</p>
        <Input {...register('userName', { required: true })} />
        {errors.userName?.type === 'required' && (
          <span className="input-error">{t('authPage.validation.required')}</span>
        )}
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
