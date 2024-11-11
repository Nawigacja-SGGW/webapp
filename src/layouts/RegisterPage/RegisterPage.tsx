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
      <Input placeholder="E-mail" ref={emailInput} />
      <Input placeholder="Username" ref={usernameInput} />
      <Input placeholder="Password" type="password" ref={passwordInput} />
      <Input placeholder="Confirm password" type="password" ref={confirmPasswordInput} />

      {error && <span>{error}</span>}

      <Button label="Sign up" onClick={signUp} />
    </FormLayout>
  );
};
