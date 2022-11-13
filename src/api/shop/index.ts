import { Axios } from 'src/api/core';
import { getQueryString } from 'src/utils';

export const getProductItemList = async (
  queryString: string,
): Promise<res.ShopFeed> => {
  const response = await Axios.get(
    `/api/shop/filter?${decodeURIComponent(queryString)}`,
  );
  return response;
};

export const getRecommendItemList = async (
  queryString: string,
): Promise<res.RecommendFeed> => {
  const response = await Axios.get(
    `/api/recommend?${decodeURIComponent(queryString)}`,
  );
  return response;
};

export const getMyItemList = async (
  queryString: string,
): Promise<res.RecommendFeed> => {
  const response = await Axios.get(
    `/api/product/my?${decodeURIComponent(queryString)}`,
  );
  return response;
};

type GetInfiniteParams = {
  params?: string;
  queryStringObj: { [key: string]: string };
  apiFunc: (queryString: string) => Promise<res.ShopFeed | res.RecommendFeed>;
};

export const getInfiniteProducts =
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
