import './Settings.scss';
import { useTranslation } from 'react-i18next';
import { FormLayout } from '../../layouts/AuthorizationFormLayout/AuthorizationFormLayout';
import { Input } from '../../components/ui/Input/Input';
import { Button } from '../../components/ui/Button/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RadioInputAttributes, RadioInputs } from '../ui/RadioInputs/RadioInputs';

export const Settings = () => {
  const { t } = useTranslation();

  type SettingsInputs = {
    routePreferences: string;
    appLanguage: string;
    password: string;
    confirmPassword: string;
  };

  const {
    formState: { errors, isSubmitting, isValid },
    register,
    handleSubmit,
    setError,
    clearErrors,
  } = useForm<SettingsInputs>();

  const onSubmit: SubmitHandler<SettingsInputs> = (data) => {
    clearErrors();
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: t('settingsPage.input.error.passwordsNotMatch'),
      });
    }
  };

  const routePreferencesOptions: RadioInputAttributes[] = [
    {
      value: 'walk',
      label: t('settingsPage.section.routePreferences.option.walk'),
      id: 'option-walk',
    },
    {
      value: 'bike',
      label: t('settingsPage.section.routePreferences.option.bike'),
      id: 'option-bike',
    },
  ];

  const appLanguageOptions: RadioInputAttributes[] = [
    {
      value: 'polish',
      label: t('settingsPage.section.appLanguage.option.polish'),
      id: 'option-polish',
    },
    {
      value: 'english',
      label: t('settingsPage.section.appLanguage.option.english'),
      id: 'option-english',
    },
  ];

  return (
    <div className="settings">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout title={t('settingsPage.header')}>
          <h3>{t('settingsPage.section.routePreferences')}</h3>
          <br />
          <RadioInputs
            radioInputsValues={routePreferencesOptions}
            registerOptions={register('routePreferences', { required: true })}
          ></RadioInputs>

          <br />
          <h3>{t('settingsPage.section.appLanguage')}</h3>
          <br />
          <RadioInputs
            radioInputsValues={appLanguageOptions}
            registerOptions={register('appLanguage', { required: true })}
          ></RadioInputs>

          <br />
          <h3>{t('settingsPage.section.changeYourPassword')}</h3>
          <p className="input-label">{t('authPage.labels.password')}</p>
          <Input
            placeholder={t('settingsPage.input.placeholder.newPassword')}
            type="password"
            {...register('password', { required: true })}
          />
          <p className="input-label">{t('authPage.labels.confirmPassword')}</p>
          <Input
            placeholder={t('settingsPage.input.placeholder.confirmPassword')}
            type="password"
            {...register('confirmPassword', { required: true })}
          />
          {errors.confirmPassword && errors.confirmPassword && (
            <span className="input-error">{errors.confirmPassword.message}</span>
          )}
        </FormLayout>
        <div className="submit-btn-wrapper">
          <div>
            <Button
              className="green-button submit-btn"
              label={t('settingsPage.button.save')}
              type="submit"
              disabled={isSubmitting || !isValid}
              primary
            />
          </div>
        </div>
      </form>
    </div>
  );
};
