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
    navigate(`/register`);
  }, []);

  const signIn = () => {
    console.log('logged in');
  };
  const handleNavigateToForgotPassword = useCallback(() => {
    navigate(`/forgot-password`);
  }, []);

  return (
    <FormLayout title="Login">
      <p className="input-label">Username or email</p>
      <Input placeholder="sXXXXXX@sggw.edu.pl" ref={usernameInput} />
      <p className="input-label">Password</p>
      <Input placeholder="••••••••" ref={passwordInput} type="password" />
      <p onClick={handleNavigateToForgotPassword} className="forgot-password">
        Forgot password?
      </p>
      <Button className="green-button" label="Sign in" onClick={signIn} />
      <p className="dont-have-account-yet">Don't have account yet?</p>
      <Button className="black-button" label="Sign up" onClick={handleNavigateToRegisterPage} />
      <hr className="login-line"></hr>
    </FormLayout>
  );
};
