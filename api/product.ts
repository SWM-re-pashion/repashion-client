import { useQuery } from '@tanstack/react-query';
import { Axios } from 'api/core';

export const getProductDetail = async (
  id: string,
): Promise<res.ProductDetail> => {
  const response = await Axios.get(`/api/product/detail/${id}`);
  return response;
};

export function useProdutDetail(id: string) {
  const response = useQuery(['product', id], () => getProductDetail(id));
  return response;
}
