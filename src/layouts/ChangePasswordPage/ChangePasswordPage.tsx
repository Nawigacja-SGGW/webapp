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
      <p className="input-label">New password</p>
      <Input placeholder="••••••••" type="password" ref={newPassword} />
      <p className="input-label">Repeat new password</p>
      <Input placeholder="••••••••" type="password" ref={repeatedPassword} />
      {message && <span>{message}</span>}
      <Button className="green-button" label="Change password" onClick={changePassword} />
    </FormLayout>
  );
};
