/* eslint-disable no-param-reassign */
import { ACCESSTOKEN, TOKEN_REFRESH } from '@constants/api';
import { AxiosError, AxiosInstance } from 'axios';
import { setAccessToken } from 'src/utils/auth';

import { ForbiddenError } from './error';

export const refreshAccessToken = async (
  err: AxiosError,
  instance: AxiosInstance,
) => {
  try {
    const response = await instance.get<res.reissue>(TOKEN_REFRESH);
    const {
      data: { accessToken },
    } = response.data;
    if (err.config.headers) {
      err.config.headers[ACCESSTOKEN] = accessToken;
    }
    setAccessToken(accessToken);
    instance.defaults.headers[ACCESSTOKEN] = accessToken;
    response.headers['set-cookie'] = [`${ACCESSTOKEN}=${accessToken}`];
    const res = await instance.request(err.config);
    return Promise.resolve(res.data);
  } catch (error) {
    console.log(error);
    throw new ForbiddenError(403);
  }
};
