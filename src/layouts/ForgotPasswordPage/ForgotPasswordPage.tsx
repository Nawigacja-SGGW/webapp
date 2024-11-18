import { FormLayout } from '../AuthorizationFormLayout/AuthorizationFormLayout';
import { Input } from '../../components/ui/Input/Input';
import { useRef, useState } from 'react';
import { Button } from '../../components/ui/Button/Button';
import { useTranslation } from 'react-i18next';

export const ForgotPasswordPage = () => {
  const { t, i18n } = useTranslation();
  const emailInput = useRef<HTMLInputElement>();
  const [message, setMessage] = useState('');
  const sendEmail = () => {
    if (emailInput.current && /\S+@\S+\.\S+/.test(emailInput.current.value)) {
      setMessage('If your account exists, you will receive an email with a password change');
    } else {
      setMessage('Invalid email');
    }
  };

  return (
    <FormLayout title={t('forgotPasswordPage1.title')}>
      <p className="input-label">{t('forgotPasswordPage1.E-mail')}</p>
      <Input placeholder="sXXXXXX@sggw.edu.pl" ref={emailInput} />
      {message && <span>{message}</span>}
      <Button
        className="green-button"
        label={t('forgotPasswordPage1.button.sendEmail')}
        onClick={sendEmail}
      />
    </FormLayout>
  );
};
