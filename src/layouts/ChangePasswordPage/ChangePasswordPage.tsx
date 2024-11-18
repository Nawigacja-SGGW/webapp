import { FormLayout } from '../AuthorizationFormLayout/AuthorizationFormLayout';
import { Input } from '../../components/ui/Input/Input';
import { useRef, useState } from 'react';
import { Button } from '../../components/ui/Button/Button';
import { useTranslation } from 'react-i18next';

export const ChangePasswordPage = () => {
  const { t, i18n } = useTranslation();
  const newPassword = useRef<HTMLInputElement>();
  const repeatedPassword = useRef<HTMLInputElement>();
  const [message, setMessage] = useState('');
  const changePassword = () => {
    if (newPassword.current && newPassword.current.value.length < 6) {
      setMessage('Password must be at least 6 characters long.');
      return;
    }
    if (
      newPassword.current &&
      repeatedPassword.current &&
      newPassword.current.value == repeatedPassword.current.value
    ) {
      setMessage('Password changed correctly.');
    } else setMessage('Passwords do not match.');
  };

  return (
    <FormLayout title={t('forgotPasswordPage2.title')}>
      <p className="input-label">{t('forgotPasswordPage2.newPassword')}</p>
      <Input placeholder="••••••••" type="password" ref={newPassword} />
      <p className="input-label">{t('forgotPasswordPage2.repeatNewPassword')}</p>
      <Input placeholder="••••••••" type="password" ref={repeatedPassword} />
      {message && <span>{message}</span>}
      <Button
        className="green-button"
        label={t('forgotPasswordPage2.button.changePassword')}
        onClick={changePassword}
      />
    </FormLayout>
  );
};
