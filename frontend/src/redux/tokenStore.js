import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

export function updateAuthStore(data) {
  const {auth} = data;
  if(auth) {
    setTokens(auth.token, auth.refresh_token);
  }
}

export function setTokens(token, refresh_token) {
  Cookies.set('khmer_lang_refresh_token', refresh_token);
  Cookies.set('khmer_lang_token', token);
}

export function setToken(token) {
  Cookies.set('khmer_lang_token', token);
}

export function getAccessToken() {
  return Cookies.get('khmer_lang_token');
}

export function getRefreshToken() {
  return Cookies.get('khmer_lang_refresh_token');
}

export function removeTokens() {
  Cookies.remove('khmer_lang_refresh_token');
  Cookies.remove('khmer_lang_token');
}

export function getSessionUUID() {
  let sessionUUID = sessionStorage.getItem("uuid");
  if(sessionUUID) {
    return sessionUUID;
  }

  // generate uuid
  sessionUUID = uuidv4();
  sessionStorage.setItem("uuid", sessionUUID);
  return sessionUUID;
}
