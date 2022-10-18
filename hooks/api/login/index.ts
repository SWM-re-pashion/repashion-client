import { useRouter } from 'next/router';

import { ACCESSTOKEN } from '@constants/api';
import { postAuthToken } from 'api/login';
import { setCookie } from 'cookies-next';
import { toastError } from 'utils/toaster';

import { useCoreMutation } from '../core';

export const usePostAuthToken = () => {
  const router = useRouter();

  return useCoreMutation(postAuthToken, {
    onSuccess: (data) => {
      const { accesToken } = data.data;
      setCookie(ACCESSTOKEN, accesToken);
      router.push('/info/basic');
    },
    onError: (error) => {
      // router.back();
      toastError({ message: '다시 로그인해주세요.' });
    },
  });
};
