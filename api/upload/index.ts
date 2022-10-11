import { AiAxios, Axios } from 'api/core';

export const postImgs = async (files: FormData) => {
  const { data } = await AiAxios.post('/api/product/uploads', files);
  return data;
};

export const postProduct = async (
  uploadData: req.UploadData,
): Promise<res.UploadData> => {
  const response = await Axios.post('/api/product', uploadData);
  return response;
};
