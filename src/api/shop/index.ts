import { Axios } from 'src/api/core';
import { getQueryString } from 'src/utils';

const getProductItemList = async (
  queryString: string,
): Promise<res.ShopFeed> => {
  const response = await Axios.get(
    `/api/shop/filter?${decodeURIComponent(queryString)}`,
  );
  return response;
};

type GetInfiniteParams = {
  queryStringObj: { [key: string]: string };
  apiFunc: (queryString: string) => Promise<res.ShopFeed>;
};

const getInfiniteProducts =
  ({ queryStringObj, apiFunc }: GetInfiniteParams) =>
  async ({ pageParam = 0 }) => {
    const queryString = getQueryString({
      ...queryStringObj,
      page: `${pageParam}`,
      size: '50',
    });

    const {
      data: { pagination, items },
    } = await apiFunc(queryString);

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
