/* eslint-disable camelcase */
import { GetServerSidePropsContext } from 'next';

import { ReactElement } from 'react';

import HeadMeta from '@atoms/HeadMeta';
import { queries, queryData } from '@constants/queryString';
import { queryKey, DAYTIME } from '@constants/react-query';
import { seoData } from '@constants/seo';
import Footer from '@organisms/Footer';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Layout from '@templates/Layout';
import {
  getBreadcrumb,
  getCategory,
  getCategoryPartialTree,
} from 'api/category';
import { withGetServerSideProps } from 'api/core/withGetServerSideProps';
import { getInfiniteProducts, getProductItemList } from 'api/shop';
import ProductItemList from 'components/Shop/Organisms/ProductItemList';
import ShopHeader from 'components/Shop/Organisms/ShopHeader';
import { categoryPropArr } from 'components/Upload/organisms/Dialog/utils';
import { useMultipleSearch } from 'hooks';
import { useCategoryTree } from 'hooks/api/category';
import { getQueryStringObj, getQueriesArr } from 'utils';
import { judgeCategoryId } from 'utils/shop.utils';

export const getServerSideProps = withGetServerSideProps(
  async ({ query }: GetServerSidePropsContext) => {
    const { category, hide_sold, order, style } = query;
    const { price_goe, price_loe, color, fit, length, clothes_size } = query;
    const arr1 = [category, hide_sold, order, style]; // TODO: obj로 변경
    const arr2 = [price_goe, price_loe, color, fit, length, clothes_size];
    const queryArr = [...arr1, ...arr2];

    const queryObj = getQueriesArr(queryData, queryArr);
    const queryStringObj = getQueryStringObj(queryObj);

    const queryClient = new QueryClient();

    await queryClient.fetchQuery(queryKey.category(false), () => getCategory());
    await queryClient.fetchInfiniteQuery(
      queryKey.productItemList(queryStringObj),
      getInfiniteProducts({ queryStringObj, apiFunc: getProductItemList }),
      {
        getNextPageParam: ({ pagination: { isEndOfPage, pageNumber } }) => {
          return isEndOfPage ? undefined : pageNumber + 1;
        },
        cacheTime: DAYTIME,
        staleTime: DAYTIME,
      },
    );

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
    };
  },
);

function Shop() {
  const data = useCategoryTree(false)?.data;
  const queryObj = useMultipleSearch(queryData, queries);
  const { category, hide_sold, order } = queryObj;

  if (!data) return null;

  const gender = category[0];
  const genderSelectMenu = data.children;
  const existingGender = genderSelectMenu[0].id;
  const genderQuery = gender || existingGender;

  const id = judgeCategoryId(category);
  const selectData = getCategoryPartialTree(data, id);
  const breadCrumb = getBreadcrumb(data, id) || '';
  const isInclude = categoryPropArr(selectData, 'id').includes(category);
  const categoryQuery = isInclude ? category : selectData[0].id;

  const queryStringObj: Omit<req.ShopFeed, 'page' | 'size'> = {
    ...queryObj,
    category: categoryQuery,
  };

  const props = {
    genderQuery,
    categoryQuery,
    orderQuery: order,
    hideSoldQuery: hide_sold,
    genderSelectMenu,
    selectData,
    breadCrumb,
  };

  return (
    <>
      <HeadMeta title="re:Fashion | 상품 피드" url={`${seoData.url}/shop`} />
      <ShopHeader {...props} />
      <ProductItemList needPullToRefresh {...{ queryStringObj }} />
      {/** TODO: 렌더링 최적화 */}
      <Footer />
    </>
  );
}

Shop.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default Shop;
