import { FormLayout } from '../AuthorizationFormLayout/AuthorizationFormLayout';
import { Input } from '../../components/ui/Input/Input';
import { useRef, useState } from 'react';
import { Button } from '../../components/ui/Button/Button';

export const ChangePasswordPage = () => {
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
    <FormLayout title="Change your password">
      <Input placeholder="New password" type="password" ref={newPassword} />
      <Input placeholder="Repeat new password" type="password" ref={repeatedPassword} />
      {message && <span>{message}</span>}
      <Button label="Change password" onClick={changePassword} />
    </FormLayout>
  );
};
