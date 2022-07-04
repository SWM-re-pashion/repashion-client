import { useMutation, UseMutationResult } from 'react-query';

import { postAuthToken } from 'api/postAuthToken';
import { AxiosError } from 'axios';

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
