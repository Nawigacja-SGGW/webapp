import axios from 'axios';

const API_URL = import.meta.env.VITE_MAIN_API_URL;

export function signInRequest(email: string, password: string) {
  return axios.post(API_URL + '/auth/login', {
    email,
    password,
  });
}

export function signUpRequest(email: string, password: string) {
  return axios.post(API_URL + '/auth/register', {
    email,
    password,
  });
}

export function resetPassword(email: string) {
  return axios.patch(API_URL + '/auth/reset-password-request', {
    email,
  });
}

//todo implement change password
