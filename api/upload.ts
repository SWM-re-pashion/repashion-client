import { useMutation } from 'react-query';

import { AiAxios } from 'lib/axios';

export const postImgs = async (files: FormData) => {
  const { data } = await AiAxios.post('/api/product/uploads', files);
  return data;
};

export const useImgUpload = () => {
  return useMutation(
    (files: FormData) => {
      return postImgs(files);
    },
    {
      onError: (err) => {
        console.log(err);
      },
    },
  );
};
