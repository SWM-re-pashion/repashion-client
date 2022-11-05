/* eslint-disable no-param-reassign */
import { ACCESSTOKEN, TOKEN_REFRESH } from '@constants/api';
import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { setAccessToken } from 'src/utils/auth';

import { ForbiddenError } from './error';

export const refreshAccessToken = async (
  err: AxiosError,
  instance: AxiosInstance,
) => {
  try {
    const response = await instance.get<
      res.reissue,
      AxiosResponse<res.reissue, any>['data']
    >(TOKEN_REFRESH);
    const {
      data: { accessToken },
    } = response;
    if (err.config.headers) {
      err.config.headers[ACCESSTOKEN] = accessToken;
    }
    setAccessToken(accessToken);
    instance.defaults.headers[ACCESSTOKEN] = accessToken;
    const res = await instance.request(err.config);
    return Promise.resolve(res);
  } catch (error) {
    throw new ForbiddenError(403);
  }
};
