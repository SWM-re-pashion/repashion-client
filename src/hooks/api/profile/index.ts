import { useRouter } from 'next/router';

import { queryKey } from '@constants/react-query';
import { getMyInfo, getUserInfo, updateMyInfo } from 'src/api/profile/index';
import { toastSuccess, toastError } from 'src/utils/toaster';

import { useCoreMutation, useCoreQuery } from '../core';

export function useMyInfo() {
  const response = useCoreQuery(queryKey.myInfo, () => getMyInfo());
  return response;
}

export function useUserInfo(id: string) {
  const response = useCoreQuery(queryKey.userInfo(id), () => getUserInfo(id));
  return response;
}

export function useUpdateMyInfo() {
  const router = useRouter();
  return useCoreMutation(updateMyInfo, {
    onSuccess: () => {
      toastSuccess({ message: '성공적으로 업데이트했습니다.' });
      router.replace('/mypage');
    },
    onSettled: (_, err) => {
      if (err) toastError({ message: '업데이트에 실패했습니다.' });
    },
  });
}
