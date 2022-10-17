import { Axios } from '../core';

export const postAuthToken = async (token: string): Promise<res.OAuth> => {
  const response = Axios.post('/api/auth/login', { authCode: token });
  return response;
};
