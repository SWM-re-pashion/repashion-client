import { useQuery } from '@tanstack/react-query';
import { Axios } from 'lib/axios';

export const getProductDetail = async (
  id: string,
): Promise<res.ProductDetail> => {
  const { data } = await Axios.get<res.ProductDetail>(
    `/api/product/detail/${id}`,
  );
  return data;
};

export function useProdutDetail(id: string) {
  const response = useQuery(['product', id], () => getProductDetail(id));
  return response;
}
