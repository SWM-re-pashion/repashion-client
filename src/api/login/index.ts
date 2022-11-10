import { LOGOUT_URL } from '@constants/api';
import { queryKey } from '@constants/react-query';
import { Axios } from 'src/api/core';
import { queryClient } from 'src/pages/_app';
import { deleteAccessToken } from 'src/utils/auth';
import { toastSuccess, toastError } from 'src/utils/toaster';

export const postAuthToken = async (token: string): Promise<res.OAuth> => {
  const response = Axios.post('api/auth/login', {
    accessToken: token,
  });
  return response;
};

export const logout = async () => {
  try {
    const response = await Axios.get(LOGOUT_URL);
    deleteAccessToken();
    toastSuccess({ message: '로그아웃에 성공했습니다.' });
    return response;
  } catch (err) {
    toastError({ message: '로그아웃에 실패했습니다.' });
    return err;
  }
};

export const logoutUtil = () => {
  toastSuccess({ message: '로그아웃되었습니다.' });
  deleteAccessToken();
  queryClient.invalidateQueries(['userInfo']);
  queryClient.invalidateQueries(queryKey.myInfo);
};

export const authTest = async () => {
  const response = await Axios.get('/auth-verification');
  return response;
};
