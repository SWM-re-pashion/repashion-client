import { useMutation, UseMutationResult } from 'react-query';

import { AxiosError } from 'axios';

import { postAuthToken } from 'api/postAuthToken';

export default function usePostAuthToken(): UseMutationResult<
  string,
  AxiosError,
  string
> {
  return useMutation(postAuthToken, {
    onSuccess: (data) => {
      alert(data);
    },
    onError: (error) => {
      alert(error);
    },
  });
}
