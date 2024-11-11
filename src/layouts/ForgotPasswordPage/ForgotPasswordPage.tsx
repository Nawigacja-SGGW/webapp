import { FormLayout } from '../AuthorizationFormLayout/AuthorizationFormLayout';
import { Input } from '../../components/ui/Input/Input';
import { useRef, useState } from 'react';
import { Button } from '../../components/ui/Button/Button';

export const ForgotPasswordPage = () => {
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
    <FormLayout title="Change your password">
      <Input placeholder="E-mail" ref={emailInput} />
      {message && <span>{message}</span>}
      <Button label="Send e-mail" onClick={sendEmail} />
    </FormLayout>
  );
};
