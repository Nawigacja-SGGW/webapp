import { FormLayout } from '../AuthorizationFormLayout/AuthorizationFormLayout';
import { Input } from '../../components/ui/Input/Input';
import { Button } from '../../components/ui/Button/Button';
import { useRef, useState } from 'react';

export const RegisterPage = () => {
  const emailInput = useRef<HTMLInputElement>();
  const usernameInput = useRef<HTMLInputElement>();
  const passwordInput = useRef<HTMLInputElement>();
  const confirmPasswordInput = useRef<HTMLInputElement>();
  const [error, setError] = useState('');

  const validateForm = () => {
    setError('');
    let isValid = true;

    // Email validation
    if (emailInput.current && !/\S+@\S+\.\S+/.test(emailInput.current.value)) {
      setError('Please enter a valid email.');
      isValid = false;
    }
    // Username validation
    else if (usernameInput.current && usernameInput.current.value.length < 3) {
      setError('Username must be at least 3 characters long.');
      isValid = false;
    }
    // Password validation
    else if (passwordInput.current && passwordInput.current.value.length < 6) {
      setError('Password must be at least 6 characters long.');
      isValid = false;
    }
    // Confirm password validation
    else if (
      confirmPasswordInput.current &&
      passwordInput.current &&
      confirmPasswordInput.current.value !== passwordInput.current.value
    ) {
      setError('Passwords do not match.');
      isValid = false;
    }

    return isValid;
  };

  const signUp = () => {
    if (validateForm()) {
      setError('');
      console.log('registered');
    }
  };

  return (
    <FormLayout title="Create account">
      <p className="input-label">E-mail</p>
      <Input placeholder="sXXXXXX@sggw.edu.pl" ref={emailInput} />
      <p className="input-label">Username</p>
      <Input placeholder="xxxxx" ref={usernameInput} />
      <p className="input-label">Password</p>
      <Input placeholder="••••••••" type="password" ref={passwordInput} />
      <p className="input-label">Confirm password</p>
      <Input placeholder="••••••••" type="password" ref={confirmPasswordInput} />

      {error && <span>{error}</span>}

      <Button className="green-button" label="Sign up" onClick={signUp} />
    </FormLayout>
  );
};
