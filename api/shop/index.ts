import { Pagination } from '#types/pagination';
import { Axios } from 'lib/axios';

export const getProductItemList = async (): Promise<
  Pagination<res.ProductSummary[]>
> => {
  const { data } = await Axios.get('/api');
  return data;
};
