import { useQuery } from '@tanstack/react-query';
import { Axios } from 'lib/axios';

export const getProductDetail = async (
  id: string,
): Promise<res.ProductDetail> => {
  return await Axios.get(`/api/product/detail/${id}`);
};

export function useProdutDetail(id: string) {
  const response = useQuery(['product', id], () => getProductDetail(id));
  return response;
}
