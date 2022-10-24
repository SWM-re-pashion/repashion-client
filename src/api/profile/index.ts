import { Axios } from 'src/api/core';

export const getMyInfo = async (): Promise<res.Profile> => {
  const response = await Axios.get('/api/user/my');
  return response;
};

export const getUserProfile = async (id: string) => {
  const response = await Axios.get(`/api/user/${id}`);
  return response;
};
