import { getCookie, setCookie, deleteCookie } from 'cookies-next';

import { ACCESSTOKEN } from '@constants/api';

export const setAccessToken = (token: string | null) => {
  setCookie(ACCESSTOKEN, token || '');
};

export const getAccessToken = () => {
  return getCookie(ACCESSTOKEN);
};

export const logout = () => {
  deleteCookie(ACCESSTOKEN);
};
