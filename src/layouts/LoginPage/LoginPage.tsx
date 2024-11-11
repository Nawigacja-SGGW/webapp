import { FormLayout } from '../AuthorizationFormLayout/AuthorizationFormLayout';
import { Input } from '../../components/ui/Input/Input';
import { useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button/Button';

export const LoginPage = () => {
  const navigate = useNavigate();
  const usernameInput = useRef<HTMLInputElement>();
  const passwordInput = useRef<HTMLInputElement>();
  const handleNavigateToRegisterPage = useCallback(() => {
    navigate(`/auth/register`);
  }, []);

  const signIn = () => {
    console.log('logged in');
  };
  const handleNavigateToForgotPassword = useCallback(() => {
    navigate(`/auth/forgot-password`);
  }, []);

  return (
    <FormLayout title="Login">
      <Input placeholder="Username or email" ref={usernameInput} />
      <Input placeholder="Password" ref={passwordInput} type="password" />
      <p onClick={handleNavigateToForgotPassword}>Forgot password?</p>
      <Button label="Sign in" onClick={signIn} />
      <p>Don't have account yet?</p>
      <Button label="Sign up" onClick={handleNavigateToRegisterPage} />
    </FormLayout>
  );
};
