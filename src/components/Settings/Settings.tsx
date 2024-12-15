import './Settings.scss';
import { useTranslation } from 'react-i18next';
import { FormLayout } from '../../layouts/AuthorizationFormLayout/AuthorizationFormLayout';
import { Input } from '../ui/Input/Input.tsx';
import { Button } from '../ui/Button/Button.tsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RadioInputAttributes, RadioInputs } from '../ui/RadioInputs/RadioInputs';
import { useAppStore } from '../../store';
import i18n from 'i18next';

export const Settings = () => {
  const { t } = useTranslation();

  type SettingsInputs = {
    routePreference: 'foot' | 'bike';
    appLanguage: 'en' | 'pl';
    password: string;
    confirmPassword: string;
  };

  const { routePreference, language } = useAppStore((state) => state.preferences);
  const setRoutePreference = useAppStore((state) => state.setRoutePreference);
  const setLanguage = useAppStore((state) => state.setLanguage);

  console.log(routePreference);

  const {
    formState: { errors, isSubmitting, isValid },
    register,
    handleSubmit,
    setError,
    clearErrors,
  } = useForm<SettingsInputs>();

  const onSubmit: SubmitHandler<SettingsInputs> = (data) => {
    clearErrors();
    const { password, confirmPassword, routePreference, appLanguage } = data;
    setRoutePreference(routePreference);
    setLanguage(appLanguage);
    i18n.changeLanguage(appLanguage);

    if (password !== confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: t('settingsPage.input.error.passwordsNotMatch'),
      });
    }
  };

  const Options: RadioInputAttributes[] = [
    {
      value: 'foot',
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
      value: 'pl',
      label: t('settingsPage.section.appLanguage.option.polish'),
      id: 'option-polish',
    },
    {
      value: 'en',
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
            defaultValue={routePreference}
            radioInputsValues={Options}
            registerOptions={register('routePreference', { required: true })}
          ></RadioInputs>

          <br />
          <h3>{t('settingsPage.section.appLanguage')}</h3>
          <br />
          <RadioInputs
            defaultValue={language}
            radioInputsValues={appLanguageOptions}
            registerOptions={register('appLanguage', { required: true })}
          ></RadioInputs>

          <br />
          <h3>{t('settingsPage.section.changeYourPassword')}</h3>
          <p className="input-label">{t('authPage.labels.password')}</p>
          <Input
            placeholder={t('settingsPage.input.placeholder.newPassword')}
            type="password"
            {...register('password')}
          />
          <p className="input-label">{t('authPage.labels.confirmPassword')}</p>
          <Input
            placeholder={t('settingsPage.input.placeholder.confirmPassword')}
            type="password"
            {...register('confirmPassword')}
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
