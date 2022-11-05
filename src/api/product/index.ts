import { Axios } from 'src/api/core';

export const getProductDetail = async (
  id: string,
): Promise<res.ProductDetail> => {
  const response = await Axios.get(`/api/product/detail/${id}`);
  return response;
};

export const deleteProductDetail = async (id: string) => {
  const response = await Axios.delete(`/api/product/${id}`);
  return response;
};

export const updateProductStatus = async (id: string) => {
  const response = await Axios.patch(`/api/product/status/${id}`);
  return response;
};
