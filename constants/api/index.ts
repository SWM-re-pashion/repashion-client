export const HTTP_METHOD = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
} as const;

export const ACCESSTOKEN = 'x-access-token';

export const KAKAO_OAUTH_URL = `${process.env.OAUTH_URL}&client_id=${process.env.OAUTH_CLIENT_ID}&redirect_uri=${process.env.OAUTH_REDIRECT_URI}&state=${process.env.OAUTH_STATE}&identity_provider=kakao`;
export const GOOGLE_OAUTH_URL = `${process.env.OAUTH_URL}&client_id=${process.env.OAUTH_CLIENT_ID}&redirect_uri=${process.env.OAUTH_REDIRECT_URI}&state=${process.env.OAUTH_STATE}&identity_provider=Google`;
