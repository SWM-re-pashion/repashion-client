import { useRouter } from 'next/router';

import { isAxiosError } from 'src/api/core/error';
import { postPreference } from 'src/api/preference';

import { toastError } from '../../../utils/toaster';
import { useCoreMutation } from '../core';

export function usePostPreference() {
  const router = useRouter();

  return useCoreMutation(postPreference, {
    onSuccess: () => {
      router.push('/shop');
    },
    onError: (error) => {
      if (isAxiosError<res.error>(error) && error.response) {
        toastError({ message: '에러가 발생했습니다.' });
      }
    },
  });
}
