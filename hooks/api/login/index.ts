import { useRouter } from 'next/router';

import { postAuthToken } from 'api/login';
import { setAccessToken } from 'utils/auth';
import { toastError, toastSuccess } from 'utils/toaster';

import { useCoreMutation } from '../core';

export const usePostAuthToken = () => {
  const router = useRouter();

  return useCoreMutation(postAuthToken, {
    onSuccess: (data) => {
      toastSuccess({ message: '로그인되었습니다.' });
      const { accessToken } = data.data;
      setAccessToken(accessToken);
      router.push('/shop');
    },
    onError: () => {
      router.back();
      toastError({ message: '다시 로그인해주세요.' });
    },
  });
};
