import { useRouter } from 'next/router';

import { postAuthToken } from 'api/login';
import { setAccessToken } from 'utils/auth';
import { toastError } from 'utils/toaster';

import { useCoreMutation } from '../core';

export const usePostAuthToken = () => {
  const router = useRouter();

  return useCoreMutation(postAuthToken, {
    onSuccess: (data) => {
      const { accessToken } = data.data;
      setAccessToken(accessToken);
      router.push('/shop');
    },
    onError: (error) => {
      // router.back();
      toastError({ message: '다시 로그인해주세요.' });
    },
  });
};
