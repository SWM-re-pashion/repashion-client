import { HTTP_METHOD } from '@constants/api';
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 3000,
  headers: {
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
        return Promise.reject(err);
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
