import { Axios } from 'api/core';

export const postAuthToken = async (token: string): Promise<res.OAuth> => {
  const response = Axios.post(`${process.env.CLIENT_URL}api/login`, {
    accessToken: token,
  });
  return response;
};
