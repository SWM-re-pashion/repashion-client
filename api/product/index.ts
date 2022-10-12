import { Axios } from 'api/core';

export const getProductDetail = async (
  id: string,
): Promise<res.ProductDetail> => {
  const response = await Axios.get(`/api/product/detail/${id}`);
  return response;
};

export const getUploadedProduct = async (
  id: string,
): Promise<res.UploadedProduct> => {
  const response = await Axios.get(`/api/product/${id}`);
  return response;
};

export const deleteProductDetail = async (id: string) => {
  const response = await Axios.delete(`/api/product/delete/${id}`);
  return response;
};

export const updateProductDetail = async (id: string) => {
  const response = await Axios.put(`/api/product/${id}`);
  return response;
};
