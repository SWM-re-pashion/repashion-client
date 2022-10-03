/* eslint-disable camelcase */
import { GetServerSidePropsContext } from 'next';

import { ReactElement } from 'react';
import { dehydrate, QueryClient } from 'react-query';

import HeadMeta from '@atoms/HeadMeta';
import { queries, queryData } from '@constants/queryString';
import { queryKey } from '@constants/react-query';
import { seoData } from '@constants/seo';
import Footer from '@organisms/Footer';
import Layout from '@templates/Layout';
import {
  getCategoryData,
  useCategoryTree,
  getCategoryTree,
} from 'api/getCategoryData';
import { getInfiniteProducts } from 'api/shop';
import ProductItemList from 'components/Shop/Organisms/ProductItemList';
import ShopHeader from 'components/Shop/Organisms/ShopHeader';
import {
  categoryIdNameCodeArr,
  curCategoryChildrenByProp,
} from 'components/Upload/organisms/Dialog/utils';
import { useMultipleSearch } from 'hooks';
import { getQueryStringObj, getQueriesArr } from 'utils';

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const { category, order, hide_sold } = query;
  const { style, price_goe, price_loe, color, fit, length, clothes_size } =
    query;
  const arr1 = [category, order, hide_sold];
  const arr2 = [style, price_goe, price_loe, color, fit, length, clothes_size];
  const queryArr = [...arr1, ...arr2];

  const queryObj = getQueriesArr(queryData, queryArr);
  const queryStringObj = getQueryStringObj(queryObj);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('category', () => getCategoryData());
  await queryClient.prefetchInfiniteQuery(
    queryKey.productItemList(queryStringObj),
    getInfiniteProducts(queryStringObj),
    {
      getNextPageParam: ({ pagination: { isEndOfPage, pageNumber } }) => {
        return isEndOfPage ? undefined : pageNumber + 1;
      },
    },
  );

  return {
    props: {
      queryStringObj,
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

function Shop() {
  const data = useCategoryTree()?.data;
  const queryObj = useMultipleSearch(queryData, queries);
  const { category, hide_sold, order } = queryObj;

  if (!data) return null;

  const gender = category && category[0];
  const main = category && category.slice(0, 4);
  const genderSelectMenu = data.children;
  const existingGender = genderSelectMenu[0].id;
  const genderQuery = gender || existingGender;

  const mainCategory = getCategoryTree(data, genderQuery, 'id');
  const { curBreadCrumb: mainCrumb } = mainCategory;
  const mainSelectMenu = categoryIdNameCodeArr(mainCategory);
  const isIncludeMain =
    main && curCategoryChildrenByProp(mainCategory, 'id').includes(main);
  const mainQuery = isIncludeMain ? main : mainSelectMenu[0].id;

  const subCategory = getCategoryTree(mainCategory, mainQuery, 'id');
  const { curBreadCrumb: subCrumb } = subCategory;
  const subSelectMenu = categoryIdNameCodeArr(subCategory);
  const isIncludeSub =
    category && curCategoryChildrenByProp(subCategory, 'id').includes(category);
  const existingSubMenu = subSelectMenu.length
    ? subSelectMenu[0].id
    : undefined;
  const subQuery = isIncludeSub ? category : existingSubMenu;

  const categoryQuery = subQuery || mainQuery;
  const queryStringObj: Omit<req.ShopFeed, 'page' | 'size'> = {
    ...queryObj,
    category: categoryQuery,
  };

  const props = {
    genderQuery,
    mainQuery,
    subQuery,
    orderQuery: order,
    hideSoldQuery: hide_sold,
    genderSelectMenu,
    mainSelectMenu,
    subSelectMenu,
    breadCrumb: `${mainCrumb} > ${subCrumb}`,
  };

  return (
    <>
      <HeadMeta title="re:Fashion | 상품 피드" url={`${seoData.url}/shop`} />
      <ShopHeader {...props} />

      <ProductItemList needPullToRefresh {...{ queryStringObj }} />

      <Footer />
    </>
  );
}

Shop.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default Shop;
