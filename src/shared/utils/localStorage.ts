import { AUTH_KEY } from '@shared/constants';

export function getAuthFromLS() {
  return localStorage.getItem(AUTH_KEY) === 'true';
}

export function setAuthToLS(value: boolean) {
  return localStorage.setItem(AUTH_KEY, String(value));
}
