import { FormLayout } from '../../layouts/AuthorizationFormLayout/AuthorizationFormLayout';
import { Input } from '../../components/ui/Input/Input';
import { Button } from '../../components/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { EMAIL_REGEXP } from '../../utils/constans.ts';

export const ForgotPasswordPage = () => {
  const { t } = useTranslation();
  const sendEmail = () => {};

  const {
    formState: { errors },
    register,
  } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });

  return (
    <FormLayout title={t('forgotPasswordPage1.title')}>
      <p className="input-label">{t('forgotPasswordPage1.E-mail')}</p>
      <Input
        placeholder="sXXXXXX@sggw.edu.pl"
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
      <Button
        className="green-button"
        label={t('forgotPasswordPage1.button.sendEmail')}
        onClick={sendEmail}
      />
    </FormLayout>
  );
};
