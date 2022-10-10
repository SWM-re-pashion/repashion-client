import { ACCESSTOKEN, HTTP_METHOD } from '@constants/api';
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

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 3000,
  // withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
  },
});

const AiAxios = axios.create({
  baseURL: process.env.AI_API_URL,
  timeout: 3000,
  headers: {
    'Content-type': 'multipart/form-data',
  },
});

function AuthErrorInterceptor(err: AxiosError): AxiosError {
  if (isAxiosError<res.error>(err) && err.response) {
    const {
      data: { status },
    } = err.response;
    if (status === 404) {
      throw new NotFoundError(status);
    }
    if (status === 403) {
      throw new ForbiddenError(status);
    }
    if (status === 401) {
      throw new AuthError(status);
    }
  }

  return err;
}

const handleRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  return {
    ...config,
    headers: {
      ...config.headers,
      [ACCESSTOKEN]: '',
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