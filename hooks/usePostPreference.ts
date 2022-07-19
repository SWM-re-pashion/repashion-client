import { useRouter } from 'next/router';

import { useMutation, UseMutationResult } from 'react-query';

import { postPreference, PreferenceResponse } from 'api/postPreference';
import { AxiosError } from 'axios';
import { InfoState } from 'store/useInfoStore';

export default function usePostPreference(): UseMutationResult<
  PreferenceResponse,
  AxiosError,
  InfoState
> {
  const router = useRouter();

  return useMutation(postPreference, {
    onSuccess: (data) => {
      console.log(data);
      router.push('/');
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
