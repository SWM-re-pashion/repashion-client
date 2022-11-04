import router from 'next/router';

import { useCallback } from 'react';

import { queryKey } from '@constants/react-query';
import { isAxiosError } from 'src/api/core/error';
import {
  postImgs,
  postProduct,
  updateProductDetail,
  getUploadedProduct,
} from 'src/api/upload';
import { queryClient } from 'src/pages/_app';
import { useUploadStore } from 'src/store/upload/useUploadStore';
import { toastError, toastSuccess } from 'src/utils/toaster';

import { useCoreMutation, useCoreQuery } from '../core';

export const useImgUpload = () => {
  return useCoreMutation(postImgs, {
    onSuccess: (data) => {
      const { error } = data;
      if (!error) {
        toastSuccess({ message: '이미지 업로드, 인식을 성공했습니다.' });
      } else {
        toastError({ message: '이미지 인식을 실패했습니다.' });
      }
    },
    onSettled: (_, err) => {
      if (err) toastError({ message: '이미지 업로드를 실패했습니다.' });
    },
  });
};

export const useProductUpload = () => {
  const clearUpload = useUploadStore(
    useCallback((state) => state.clearUpload, []),
  );
  return useCoreMutation(postProduct, {
    onSuccess: ({ data }) => {
      router.push(`/shop/${data}`);
      queryClient.invalidateQueries(queryKey.productDetail(`${data}`));
      queryClient.invalidateQueries(['productItemList']);
      clearUpload();
      toastSuccess({ message: '상품 등록에 성공했습니다.' });
    },
    onSettled: (_, err) => {
      if (isAxiosError<res.error>(err) && !!err.response) {
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
    onSettled: (_, err) => {
      if (isAxiosError<res.error>(err) && !!err.response) {
        const { message } = err.response.data;
        toastError({ message });
      }
    },
  });
  return response;
}

export const useUploadedProduct = (id: string) => {
  return useCoreQuery(
    queryKey.uploadedProduct(id),
    () => getUploadedProduct(id),
    {
      onSettled: (_, err) => {
        if (isAxiosError<res.error>(err) && err.response) {
          toastError({ message: err.response.data.message });
        }
      },
    },
  );
};
