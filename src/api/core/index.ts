import axios from 'axios';

import setInterceptors from './interceptors';

const AiAxios = axios.create({
  baseURL: process.env.AI_API_URL,
  headers: {
    'Content-type': 'multipart/form-data',
  },
});

function createInstance() {
  const axiosInstance = axios.create({
    baseURL: process.env.API_URL,
    timeout: 5000,
    withCredentials: true,
    headers: {
      'Content-type': 'application/json',
    },
  });
  return setInterceptors(axiosInstance);
}
const Axios = createInstance();

export { Axios, AiAxios };
