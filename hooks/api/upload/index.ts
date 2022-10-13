import router from 'next/router';

import { useCallback } from 'react';

import { queryKey } from '@constants/react-query';
import { isAxiosError } from 'api/core';
import {
  postImgs,
  postProduct,
  updateProductDetail,
  getUploadedProduct,
} from 'api/upload';
import { queryClient } from 'pages/_app';
import { useUploadStore } from 'store/upload/useUploadStore';
import { toastError, toastSuccess } from 'utils/toaster';

import { useCoreMutation, useCoreQuery } from '../core';

export const useImgUpload = () => {
  return useCoreMutation(postImgs);
};

export const useProductUpload = () => {
  const clearUpload = useUploadStore(
    useCallback((state) => state.clearUpload, []),
  );
  return useCoreMutation(postProduct, {
    onSuccess: ({ data }) => {
      router.push(`/shop/${data}`);
      clearUpload();
      toastSuccess({ message: '상품 등록에 성공했습니다.' });
    },
    onError: (err) => {
      if (isAxiosError<res.ProductDeleteError>(err) && !!err.response) {
        const { message } = err.response.data;
        toastError({ message });
      }
    },
  });
};

export function useUpdateProduct(id: string) {
  const response = useCoreMutation(updateProductDetail, {
    onSuccess: ({ data }) => {
      router.push(`/shop/${data}`);
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

export const useUploadedProduct = (id: string) => {
  return useCoreQuery(queryKey.uploadedProduct(id), () =>
    getUploadedProduct(id),
  );
};
