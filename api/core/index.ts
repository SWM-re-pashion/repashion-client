import {
  ACCESSTOKEN,
  ACCESSTOKEN_EXPIRED,
  HTTP_METHOD,
  TOKEN_REFRESH,
} from '@constants/api';
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
  Method,
} from 'axios';
import { getAccessToken, setAccessToken } from 'utils/auth';

import { AuthError, ForbiddenError, NotFoundError } from './error';

export function isAxiosError<ResponseType>(
  error: unknown,
): error is AxiosError<ResponseType> {
  return axios.isAxiosError(error);
}

export const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 3000,
  withCredentials: true,
  headers: {
    'Content-type': 'application/json',
    [ACCESSTOKEN]: getAccessToken(),
  },
});

const AiAxios = axios.create({
  baseURL: process.env.AI_API_URL,
  timeout: 10000,
  headers: {
    'Content-type': 'multipart/form-data',
  },
});

function AuthErrorInterceptor(err: AxiosError): AxiosError {
  if (isAxiosError<res.error>(err) && err.response) {
    const {
      data: { status, message, code },
    } = err.response;
    if (status === 404) {
      throw new NotFoundError(status);
    }
    if (status === 403 && code === ACCESSTOKEN_EXPIRED) {
      axiosInstance
        .get<res.reissue>(TOKEN_REFRESH)
        .then((data) => {
          const { data: token } = data.data;
          setAccessToken(token);
          axiosInstance.defaults.headers[ACCESSTOKEN] = token;
        })
        .catch(() => {
          throw new ForbiddenError(status);
        });
    }
    if (status === 403) {
      throw new ForbiddenError(status);
    }
    if (status === 401) {
      throw new AuthError(status);
    }
    if (status === 400 && message === '해당 상품이 존재하지 않습니다') {
      throw new NotFoundError(status);
    }
  }

  return err;
}

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
        return Promise.reject(AuthErrorInterceptor(err));
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
