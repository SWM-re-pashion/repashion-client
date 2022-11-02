/* eslint-disable no-param-reassign */
import { ACCESSTOKEN, ACCESSTOKEN_EXPIRED, HTTP_METHOD } from '@constants/api';
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
  Method,
} from 'axios';
import { getAccessToken, setAccessToken } from 'src/utils/auth';

import { ForbiddenError, isAxiosError } from './error';
import ErrorInterceptor from './errorInterceptor';

export const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-type': 'application/json',
    [ACCESSTOKEN]: getAccessToken(),
  },
});

const AiAxios = axios.create({
  baseURL: process.env.AI_API_URL,
  timeout: 20000,
  headers: {
    'Content-type': 'multipart/form-data',
  },
});

const handleRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  return {
    ...config,
    headers: {
      ...config.headers,
    },
  };
};

const handleResponse = <T>(response: AxiosResponse<T>) => {
  return response.data;
};

export const refreshAccessToken = async (err: AxiosError) => {
  try {
    const response = await axiosInstance.get<res.reissue>(
      `${process.env.CLIENT_URL}api/refresh`,
    );
    const {
      data: { accessToken },
    } = response.data;
    if (err.config.headers) {
      err.config.headers[ACCESSTOKEN] = accessToken;
    }
    setAccessToken(accessToken);
    axiosInstance.defaults.headers[ACCESSTOKEN] = accessToken;
    const res = await axiosInstance.request(err.config);
    return Promise.resolve(handleResponse(res));
  } catch (error) {
    throw new ForbiddenError(403);
  }
};

const createApiMethod = (_axiosInstance: AxiosInstance, method: Method) => {
  return (
    url: AxiosRequestConfig['url'],
    data?: AxiosRequestConfig['data'],
    config?: Omit<AxiosRequestConfig, 'url'>,
  ): Promise<any> => {
    return _axiosInstance({
      ...handleRequest({ url, data, ...config }),
      method,
    })
      .then((res) => {
        return Promise.resolve(handleResponse(res));
      })
      .catch((err) => {
        if (isAxiosError<res.error>(err) && err.response) {
          const { status, code } = err.response.data;
          if (status === 403 && code === ACCESSTOKEN_EXPIRED) {
            return refreshAccessToken(err);
          }
        }
        return Promise.reject(ErrorInterceptor(err));
      });
  };
};

const Axios = {
  get: createApiMethod(axiosInstance, HTTP_METHOD.GET),
  post: createApiMethod(axiosInstance, HTTP_METHOD.POST),
  patch: createApiMethod(axiosInstance, HTTP_METHOD.PATCH),
  put: createApiMethod(axiosInstance, HTTP_METHOD.PUT),
  delete: createApiMethod(axiosInstance, HTTP_METHOD.DELETE),
};

export { Axios, AiAxios };
