import axios from 'axios';

const Axios = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

const AiAxios = axios.create({
  baseURL: process.env.AI_API_URL,
  headers: {
    'Content-type': 'multipart/form-data',
  },
});

export { Axios, AiAxios };
