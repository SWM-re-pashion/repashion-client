import { NextPageContext } from 'next';

import { ACCESSTOKEN } from '@constants/api';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

export const setAccessToken = (token: string | null) => {
  setCookie(ACCESSTOKEN, token || '');
};

export const getAccessToken = () => {
  return getCookie(ACCESSTOKEN) || '';
};

export const deleteAccessToken = () => {
  deleteCookie(ACCESSTOKEN);
};

export const getSSRAccessToken = (ctx: NextPageContext) => {
  return getCookie(ACCESSTOKEN, ctx)?.toString() || '';
};
