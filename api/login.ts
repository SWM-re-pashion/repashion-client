import { useRouter } from 'next/router';

import { useMutation, UseMutationResult } from 'react-query';

import { AxiosError } from 'axios';
import { Axios } from 'lib/axios';

export const postAuthToken = async (token: string): Promise<res.OAuth> => {
  const requestData: res.OAuth = {
    social: {
      id: 'kakao',
      token,
    },
  };
  const { data } = await Axios.post<res.OAuth>(
    '/api/kakao/login',
    JSON.stringify(requestData),
  );

  return data;
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
      router.back();
    },
  });
}
