export const HTTP_METHOD = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
} as const;

export const ACCESSTOKEN = 'x-access-token';

export const ACCESSTOKEN_EXPIRED = 'TOKEN_EXPIRED';
export const USER_NOT_EXISTED = 'USER_NOT_EXISTED';

export const TOKEN_REFRESH = 'api/auth/reissue';

export const KAKAO_OAUTH_URL = `${process.env.OAUTH_URL}&client_id=${process.env.OAUTH_CLIENT_ID}&redirect_uri=${process.env.OAUTH_REDIRECT_URI}&state=${process.env.OAUTH_STATE}&identity_provider=kakao`;
export const GOOGLE_OAUTH_URL = `${process.env.OAUTH_URL}&client_id=${process.env.OAUTH_CLIENT_ID}&redirect_uri=${process.env.OAUTH_REDIRECT_URI}&state=${process.env.OAUTH_STATE}&identity_provider=Google`;

export const ISR_MIN = 60;
export const ISR_5MIN = 60 * 5;
export const ISR_10MIN = 60 * 10;
export const ISR_HOUR = 60 * 60;
export const ISR_DAY = 60 * 60 * 24;
export const ISR_WEEK = 60 * 60 * 24 * 7;
export const ISR_MONTH = 60 * 60 * 24 * 30;
