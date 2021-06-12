import axios from 'axios';
import { defaultHeader } from './defaultHeader';
import { createAxiosResponseInterceptor } from './createAxiosResponseInterceptor';

defaultHeader();
createAxiosResponseInterceptor();

export function registerAccount(params) {
  return axios.post('/register', params);
}

export function loginService(params) {
  return axios.post('/signin', params);
}

export function logout() {
  return axios.delete('/signout');
}

export function getCurrentUser() {
  return axios.get('/my_account');
}

export function forgetPassword(params) {
  return axios.post('/forget_password', params);
}

export function resetPassword(params) {
  return axios.post('/reset_pasword', params);
}

export function updateAccount(params) {
  return axios.put('/users/update_profile', params);
}

export function updatePassword(params) {
  return axios.post('/users/update_pasword', params);
}
