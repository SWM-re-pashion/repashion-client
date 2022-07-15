import { useRouter } from 'next/router';

import { useMutation, UseMutationResult } from 'react-query';

import { OAuthResponse, postAuthToken } from 'api/postAuthToken';
import { AxiosError } from 'axios';

export default function usePostAuthToken(): UseMutationResult<
  OAuthResponse,
  AxiosError,
  string
> {
  const router = useRouter();

  return useMutation(postAuthToken, {
    onSuccess: (data) => {
      router.push('/info/style');
    },
    onError: (error) => {
      router.back();
    },
  });
}

// Todo 인가코드 이상한거 넘어갈 때 다시 로그인 화면
// 인가코드 타입 undefined이 일 때 다시 로그인 화면
