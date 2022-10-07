import { useRouter } from 'next/router';

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { Axios } from 'api/core';
import { AxiosError } from 'axios';

export const postAuthToken = async (token: string): Promise<res.OAuth> => {
  const response = Axios.post(
    '/api/oauth/login',
    JSON.stringify({ authCode: token }),
  );
  return response;
};

export function usePostAuthToken(): UseMutationResult<
  res.OAuth,
  AxiosError,
  string
> {
  // Todo 인가코드 이상한거 넘어갈 때 다시 로그인 화면
  // 인가코드 타입 undefined이 일 때 다시 로그인 화면
  const router = useRouter();

  return useMutation(postAuthToken, {
    onSuccess: (data) => {
      router.push('/info/style');
    },
    onError: (error) => {
      // router.back();
      console.log(error);
    },
  });
}
