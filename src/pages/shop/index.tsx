import { GetServerSidePropsContext } from 'next';

import { ReactElement } from 'react';

import HeadMeta from '@atoms/HeadMeta';
import { queries, queryData } from '@constants/queryString';
import { queryKey, QUERY_DAYTIME } from '@constants/react-query';
import { seoData } from '@constants/seo';
import Footer from '@organisms/Footer';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Layout from '@templates/Layout';
import { getBreadcrumb, getCategory, getCategoryTree } from 'src/api/category';
import { withGetServerSideProps } from 'src/api/core/withGetServerSideProps';
import { getInfiniteProducts, getProductItemList } from 'src/api/shop';
import ProductItemList from 'src/components/Shop/Organisms/ProductItemList';
import ShopHeader from 'src/components/Shop/Organisms/ShopHeader';
import { categoryPropArr } from 'src/components/Upload/organisms/Dialog/utils';
import { useMultipleSearch } from 'src/hooks';
import { useCategoryTree } from 'src/hooks/api/category';
import { getQueryStringObj, getQueriesArr } from 'src/utils';
import { judgeCategoryId } from 'src/utils/shop.utils';

export const getServerSideProps = withGetServerSideProps(
  async ({ query }: GetServerSidePropsContext) => {
    const { category, hideSold, order, style } = query;
    const { priceGoe, priceLoe, color, fit, length, clothesSize } = query;
    const arr1 = [category, hideSold, order, style]; // TODO: obj로 변경
    const arr2 = [priceGoe, priceLoe, color, fit, length, clothesSize];
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
        cacheTime: QUERY_DAYTIME,
        staleTime: QUERY_DAYTIME,
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
  const { category, hideSold, order } = queryObj;

  if (!data) return null;

  const gender = category[0];
  const genderSelectMenu = data.children;
  const existingGender = genderSelectMenu[0].id;
  const genderQuery = gender || existingGender;

  const id = judgeCategoryId(category);
  const selectData = getCategoryTree(data, id);
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
    hideSoldQuery: hideSold,
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
