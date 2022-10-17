import { useRouter } from 'next/router';

import { postAuthToken } from 'api/login';
import { toastError } from 'utils/toaster';

import { useCoreMutation } from '../core';

export const usePostAuthToken = () => {
  const router = useRouter();

  return useCoreMutation(postAuthToken, {
    onSuccess: (data) => {
      router.push('/info/basic');
    },
    onError: (error) => {
      router.back();
      toastError({ message: '다시 로그인해주세요.' });
    },
  });
};
