import { Axios } from 'src/api/core';

const getSearchingItemList = async (
  queryString: string,
): Promise<res.ShopFeed> => {
  const response = await Axios.get(`/api/shop?${queryString}`);
  return response;
};

export { getSearchingItemList };
