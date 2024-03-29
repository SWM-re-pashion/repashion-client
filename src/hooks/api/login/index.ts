import { useRouter } from 'next/router';

import { postAuthToken, authTest } from 'src/api/login';
import { setAccessToken } from 'src/utils/auth';
import { getPrevPath } from 'src/utils/pathStorage';
import { toastError, toastSuccess } from 'src/utils/toaster';

import { useCoreMutation, useCoreQuery } from '../core';

export const usePostAuthToken = () => {
  const router = useRouter();

  return useCoreMutation(postAuthToken, {
    onSuccess: (data) => {
      toastSuccess({ message: '로그인되었습니다.' });
      const { accessToken } = data.data;
      setAccessToken(accessToken);
      router.replace(getPrevPath());
    },
    onSettled: (_, error) => {
      if (error) {
        router.back();
        toastError({ message: '다시 로그인해주세요.' });
      }
    },
  });
};

export const useAuthTest = () => {
  return useCoreQuery(['auth-test'], () => authTest(), {
    staleTime: 0,
    cacheTime: 0,
  });
};
