import './Settings.scss';
import { useTranslation } from 'react-i18next';
import { FormLayout } from '../../layouts/AuthorizationFormLayout/AuthorizationFormLayout';
import { Input } from '../../components/ui/Input/Input';
import { Button } from '../../components/ui/Button/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RadioInputs } from '../ui/RadioInputs/RadioInputs';

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
      setError('confirmPassword', { type: 'manual', message: 'Passwords do not match' });
    }
  };

  return (
    <div className="settings">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout title={t('settingsPage.header')}>
          <h3>{t('settingsPage.section.routePreferences')}</h3>
          <RadioInputs
            radioInputsValues={[
              { value: 'walk', label: 'Walk', id: 'walk' },
              { value: 'cycle', label: 'Cycle', id: 'cycle' },
            ]}
            registerOptions={register('appLanguage', { required: true })}
          ></RadioInputs>
          <h3>{t('settingsPage.section.appLanguage')}</h3>
          <Input
            id="pl"
            name="app-language"
            value="polish"
            placeholder={t('settingsPage.input.placeholder.newPassword')}
            type="radio"
            {...register('appLanguage', { required: true })}
          />
          <label htmlFor="pl">Polski</label>

          <Input
            id="pl"
            placeholder={t('settingsPage.input.placeholder.newPassword')}
            type="radio"
            name="app-language"
            value="english"
            {...register('appLanguage', { required: true })}
          />
          <label htmlFor="pl">Angielski</label>

          <h3>{t('settingsPage.section.changeYourPassword')}</h3>
          <p className="input-label">{t('authPage.labels.password')}</p>
          <Input
            placeholder={t('settingsPage.input.placeholder.newPassword')}
            type="password"
            {...register('password', { required: true })}
          />
          {errors.password && <span className="input-error">This field is required</span>}
          <p className="input-label">{t('authPage.labels.confirmPassword')}</p>
          <Input
            placeholder={t('settingsPage.input.placeholder.confirmPassword')}
            type="password"
            {...register('confirmPassword', { required: true })}
          />
          {errors.confirmPassword && errors.confirmPassword.type != 'manual' && (
            <span className="input-error">This field is required</span>
          )}
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
