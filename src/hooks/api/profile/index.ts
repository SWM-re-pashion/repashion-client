import { useRouter } from 'next/router';

import { queryKey } from '@constants/react-query';
import { toastSuccess, toastError } from 'src/utils/toaster';

import { getMyInfo, updateMyInfo } from '../../../api/profile/index';
import { useCoreMutation, useCoreQuery } from '../core';

export function useMyInfo() {
  const response = useCoreQuery(queryKey.myInfo, () => getMyInfo());
  return response;
}

export function useSaveMyInfo() {
  const router = useRouter();
  return useCoreMutation(updateMyInfo, {
    onSuccess: () => {
      toastSuccess({ message: '성공적으로 업데이트했습니다.' });
      router.replace('/mypage');
    },
    onError: () => {
      toastError({ message: '업데이트에 실패했습니다.' });
    },
  });
}
