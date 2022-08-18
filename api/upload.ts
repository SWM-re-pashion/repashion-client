import { useMutation } from 'react-query';

import axios from 'lib/axios';

export const postImgs = async (files: FileList) => {
  console.log(files);
  const { data } = await axios.post('/api/product/upload', files);
  return data;
};

export const useImgUpload = () => {
  return useMutation(
    (files: FileList) => {
      return postImgs(files);
    },
    {
      onSuccess: () => {
        console.log('success');
      },
    },
  );
};
