import { AiAxios, Axios } from 'src/api/core';

export const postImgs = async (files: FormData): Promise<res.ImgUpload> => {
  const { data } = await AiAxios.post('/api/product/uploads', files);
  return data;
};

export const postProduct = async (
  uploadData: req.UploadData,
): Promise<res.UploadData> => {
  const response = await Axios.post('/api/product', uploadData);
  return response;
};

export const updateProductDetail = async ({
  id,
  body,
}: {
  id: string;
  body: req.UploadData;
}): Promise<res.UploadData> => {
  const response = await Axios.put(`/api/product/${id}`, body);
  return response;
};

export const getUploadedProduct = async (
  id: string,
): Promise<res.UploadedProduct> => {
  const response = await Axios.get(`/api/product/${id}`);
  return response;
};
