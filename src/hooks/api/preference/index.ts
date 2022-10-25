import { useRouter } from 'next/router';

import { queryKey } from '@constants/react-query';
import { isAxiosError } from 'src/api/core/error';
import { getStyleImgs, postPreference } from 'src/api/preference';
import { toastSuccess, toastError } from 'src/utils/toaster';

import { useCoreMutation, useCoreQuery } from '../core';

export function usePostPreference() {
  const router = useRouter();

  return useCoreMutation(postPreference, {
    onSuccess: () => {
      toastSuccess({ message: '정보를 성공적으로 입력했습니다.' });
      router.push('/shop');
    },
    onError: (error) => {
      if (isAxiosError<res.error>(error) && error.response) {
        toastError({ message: '에러가 발생했습니다.' });
      }
    },
  });
}

export function useStyleImgs() {
  const response = useCoreQuery(queryKey.styleImgs, getStyleImgs, {
    onError: (error) => {
      if (isAxiosError<res.error>(error) && error.response) {
        const { message } = error.response.data;
        toastError({ message });
      }
    },
  });
  return response;
}
