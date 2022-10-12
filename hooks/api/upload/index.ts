import { queryKey } from '@constants/react-query';
import { getUploadedProduct } from 'api/product';
import { postImgs, postProduct } from 'api/upload';

import { useCoreMutation, useCoreQuery } from '../core';

export const useImgUpload = () => {
  return useCoreMutation(postImgs, {
    onError: (err) => {
      console.log(err);
    },
  });
};

export const useProductUpload = () => {
  return useCoreMutation(postProduct, {
    onError: (err) => {
      console.log(err);
    },
  });
};

export const useUploadedProduct = (id: string) => {
  return useCoreQuery(queryKey.uploadedProduct(id), () =>
    getUploadedProduct(id),
  );
};
