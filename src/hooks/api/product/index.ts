import { useRouter } from 'next/router';

import { queryKey } from '@constants/react-query';
import { isAxiosError } from 'src/api/core/error';
import {
  deleteProductDetail,
  getProductDetail,
  updateProductStatus,
} from 'src/api/product';
import { queryClient } from 'src/pages/_app';
import { toastError, toastSuccess } from 'src/utils/toaster';

import { useCoreMutation, useCoreQuery } from '../core';

export function useProdutDetail(id: string) {
  const response = useCoreQuery(
    queryKey.productDetail(id),
    () => getProductDetail(id),
    {
      suspense: true,
    },
  );
  return response;
}

export function useDeleteProduct(id: string) {
  const router = useRouter();
  const response = useCoreMutation(deleteProductDetail, {
    onSuccess: () => {
      router.back();
      queryClient.removeQueries(queryKey.productDetail(id));
      queryClient.invalidateQueries(['productItemList']);
      toastSuccess({ message: '상품을 삭제했습니다.' });
    },
    onSettled: (_, err) => {
      if (isAxiosError<res.error>(err) && !!err.response) {
        const { message } = err.response.data;
        toastError({ message });
      }
    },
  });
  return response;
}

export function useUpdateProductStatus(id: string) {
  return useCoreMutation(updateProductStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey.productDetail(id));
      queryClient.invalidateQueries(['productItemList']);
      queryClient.invalidateQueries(['myItemList']);
      toastSuccess({ message: '상품상태를 변경했습니다.' });
    },
    onSettled: (_, err) => {
      if (isAxiosError<res.error>(err) && !!err.response) {
        const { message } = err.response.data;
        toastError({ message });
      }
    },
  });
}
