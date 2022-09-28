/* eslint-disable camelcase */
import { GetServerSidePropsContext } from 'next';

import { ReactElement } from 'react';
import { dehydrate, QueryClient } from 'react-query';

import HeadMeta from '@atoms/HeadMeta';
import { orderData } from '@constants/category';
import { queries } from '@constants/queryString';
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

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const { category, order, hide_sold } = query;
  const { style, price_goe, price_loe, color, fit, length, clothes_size } =
    query;
  const queryClient = new QueryClient();

  const queryStringObj = {
    category: (category as string) || '1',
    order: (order as string) || orderData[0].code,
    hide_sold: (hide_sold as string) || 'true',
    style: (style as string) || '',
    price_goe: (price_goe as string) || '',
    price_loe: (price_loe as string) || '',
    color: (color as string) || '',
    fit: (fit as string) || '',
    length: (length as string) || '',
    clothes_size: (clothes_size as string) || '',
  };

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
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

function Shop() {
  const data = useCategoryTree()?.data;

  const [
    category,
    hideSold,
    order,
    style,
    priceGoe,
    priceLoe,
    color,
    fit,
    length,
    clothesSize,
  ] = useMultipleSearch(queries);

  if (!data) return null;
  const orderQuery = order || orderData[0].code;
  const hideSoldQuery = hideSold || 'true';

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
    category: categoryQuery,
    hide_sold: hideSoldQuery,
    order: orderQuery,
    style,
    price_goe: priceGoe,
    price_loe: priceLoe,
    color,
    fit,
    length,
    clothes_size: clothesSize,
  };

  const props = {
    genderQuery,
    mainQuery,
    subQuery,
    orderQuery,
    hideSoldQuery,
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
