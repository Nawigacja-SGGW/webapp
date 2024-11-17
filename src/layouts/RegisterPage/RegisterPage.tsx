import { FormLayout } from '../AuthorizationFormLayout/AuthorizationFormLayout';
import { Input } from '../../components/ui/Input/Input';
import { Button } from '../../components/ui/Button/Button';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const RegisterPage = () => {
  const { t, i18n } = useTranslation();
  const emailInput = useRef<HTMLInputElement>();
  const usernameInput = useRef<HTMLInputElement>();
  const passwordInput = useRef<HTMLInputElement>();
  const confirmPasswordInput = useRef<HTMLInputElement>();
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
    // if (validateForm()) {
    //   setError('');
    //   console.log('registered');
    // }
    //TODO create logic
    setTimeout(() => {
      navigate('/home/map');
    }, 1000);
  };

  return (
    <FormLayout title={t('authPage.title.signup')}>
      <p className="input-label">{t('authPage.labels.email')}</p>
      <Input placeholder="sXXXXXX@sggw.edu.pl" ref={emailInput} />
      <p className="input-label">{t('authPage.labels.username')}</p>
      <Input placeholder="xxxxx" ref={usernameInput} />
      <p className="input-label">{t('authPage.labels.password')}</p>
      <Input placeholder="••••••••" type="password" ref={passwordInput} />
      <p className="input-label">{t('authPage.labels.confirmPassword')}</p>
      <Input placeholder="••••••••" type="password" ref={confirmPasswordInput} />

      {error && <span>{error}</span>}

      <Button className="green-button" label={t('authPage.button.signup')} onClick={signUp} />
    </FormLayout>
  );
};
