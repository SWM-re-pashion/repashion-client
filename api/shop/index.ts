import { Axios } from 'lib/axios';

export const getProductItemList = async (
  queryString: string,
): Promise<res.ShopFeed> => {
  const response = await Axios.get(`/api/shop?${queryString}`);
  return response.data;
};
