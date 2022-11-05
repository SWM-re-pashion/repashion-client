/* eslint-disable no-param-reassign */
import { ACCESSTOKEN, ACCESSTOKEN_EXPIRED } from '@constants/api';
import { AxiosInstance } from 'axios';
import { getAccessToken } from 'src/utils/auth';

import { isAxiosError } from './error';
import ErrorInterceptor from './errorInterceptor';
import { refreshAccessToken } from './refresh';

function setInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use(
    (config) => {
      if (typeof window !== 'undefined' && config.headers) {
        config.headers[ACCESSTOKEN] = getAccessToken();
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (res) => {
      return Promise.resolve(res.data);
    },
    (err) => {
      if (isAxiosError<res.error>(err) && err.response) {
        const { status, code } = err.response.data;
        if (status === 403 && code === ACCESSTOKEN_EXPIRED) {
          return refreshAccessToken(err, instance);
        }
      }
      return Promise.reject(ErrorInterceptor(err));
    },
  );

  return instance;
}

export default setInterceptors;
