import { Axios } from 'lib/axios';
import { getQueryString } from 'utils';

const getProductItemList = async (
  queryString: string,
): Promise<res.ShopFeed> => {
  const response = await Axios.get(`/api/shop?${queryString}`); // TODO: api endpoint 수정
  return response.data;
};

const getInfiniteProducts =
  (queryStringObj: { [key: string]: string | null }) =>
  async ({ pageParam = 0 }) => {
    const queryString = getQueryString({
      ...queryStringObj,
      page: `${pageParam}`,
      size: '5',
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

export { getInfiniteProducts, getProductItemList };
