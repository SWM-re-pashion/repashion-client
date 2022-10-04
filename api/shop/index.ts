import { Axios } from 'lib/axios';
import { getQueryString } from 'utils';

const getProductItemList = async (
  queryString: string,
): Promise<res.ShopFeed> => {
  const response = await Axios.get(`/api/shop/filter?${queryString}`);
  return response.data;
};

const getInfiniteProducts =
  (queryStringObj: { [key: string]: string }) =>
  async ({ pageParam = 0 }) => {
    const queryString = getQueryString({
      ...queryStringObj,
      page: `${pageParam}`,
      size: '50',
    });

    const {
      data: { pagination, items },
    } = await getProductItemList(queryString);

    return {
      pagination: {
        ...pagination,
        pageNumber: pageParam,
      },
      items,
    };
  };
export type GetInfiniteProducts = () => ReturnType<
  ReturnType<typeof getInfiniteProducts>
>;

export { getInfiniteProducts, getProductItemList };
