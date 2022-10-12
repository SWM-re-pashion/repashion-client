import router from 'next/router';

import { useCallback } from 'react';

import { queryKey } from '@constants/react-query';
import { isAxiosError } from 'api/core';
import { getUploadedProduct } from 'api/product';
import { postImgs, postProduct } from 'api/upload';
import { useUploadStore } from 'store/upload/useUploadStore';
import { toastError, toastSuccess } from 'utils/toaster';

import { useCoreMutation, useCoreQuery } from '../core';

export const useImgUpload = () => {
  return useCoreMutation(postImgs);
};

export const useProductUpload = () => {
  const clearMeasure = useUploadStore(
    useCallback((state) => state.clearMeasure, []),
  );
  return useCoreMutation(postProduct, {
    onSuccess: ({ data }) => {
      router.push(`/shop/${data}`);
      clearMeasure();
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

export const useUploadedProduct = (id: string) => {
  return useCoreQuery(queryKey.uploadedProduct(id), () =>
    getUploadedProduct(id),
  );
};
