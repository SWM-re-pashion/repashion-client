import { postImgs, postProduct } from 'api/upload';

import { useCoreMutation } from '../core';

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
