import { queryKey } from '@constants/react-query';
import { isAxiosError } from 'api/core';
import {
  deleteProductDetail,
  getProductDetail,
  updateProductDetail,
} from 'api/product';
import { queryClient } from 'pages/_app';
import { toastError, toastSuccess } from 'utils/toaster';

import { useCoreMutation, useCoreQuery } from '../core';

export function useProdutDetail(id: string) {
  const response = useCoreQuery(queryKey.productDetail(id), () =>
    getProductDetail(id),
  );
  return response;
}

export function useDeleteProduct(id: string) {
  const response = useCoreMutation(deleteProductDetail, {
    onSuccess: () => {
      queryClient.removeQueries(queryKey.productDetail(id));
      queryClient.invalidateQueries(['productItemList']);
      toastSuccess({ message: '상품을 삭제했습니다.' });
    },
    onError: (err) => {
      if (isAxiosError<res.ProductDeleteError>(err) && !!err.response) {
        const { message } = err.response.data;
        toastError({ message });
      }
    },
  });
  return response;
}

export function useUpdateProduct(id: string) {
  const response = useCoreMutation(updateProductDetail, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey.productDetail(id));
      queryClient.invalidateQueries(['productItemList']);
      toastSuccess({ message: '상품을 수정했습니다.' });
    },
    onError: (err) => {
      if (isAxiosError<res.ProductDeleteError>(err) && !!err.response) {
        const { message } = err.response.data;
        toastError({ message });
      }
    },
  });
  return response;
}
