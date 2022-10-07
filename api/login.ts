import { useRouter } from 'next/router';

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Axios } from 'api/core';

export const postAuthToken = async (token: string): Promise<res.OAuth> => {
  return await Axios.post(
    '/api/oauth/login',
    JSON.stringify({ authCode: token }),
  );
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
