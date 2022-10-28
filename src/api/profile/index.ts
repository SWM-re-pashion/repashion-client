import { Axios } from 'src/api/core';

export const getMyInfo = async (): Promise<res.Profile> => {
  const response = await Axios.get('/api/user/my');
  return response;
};

export const updateMyInfo = async (
  body: req.UpdateMyInfo,
): Promise<res.UpdateMyInfo> => {
  const response = await Axios.patch('/api/user/my', body, {
    headers: {
      'Content-type': 'multipart/form-data',
    },
  });
  return response;
};

export const getUserInfo = async (id: string): Promise<res.Profile> => {
  const response = await Axios.get(`/api/user/${id}`);
  return response;
};
