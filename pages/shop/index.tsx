/* eslint-disable no-unsafe-optional-chaining */
import { useRouter } from 'next/router';

import { ReactElement, useEffect } from 'react';
import { dehydrate, QueryClient } from 'react-query';

import HeadMeta from '@atoms/HeadMeta';
import { orderData } from '@constants/category';
import { seoData } from '@constants/seo';
import Layout from '@templates/Layout';
import {
  getCategoryData,
  useCategoryTree,
  useMainCategoryTree,
  useSubCategory,
} from 'api/getCategoryData';
import ProductItemList from 'components/Shop/Organisms/ProductItemList';
import ShopHeader from 'components/Shop/Organisms/ShopHeader';
import {
  categoryIdNameCodeArr,
  curCategoryChildrenByProp,
} from 'components/Upload/organisms/Dialog/utils';

import $ from './style.module.scss';

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('category', () => getCategoryData());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

function Shop() {
  const router = useRouter();
  const { category, order, hideSold } = router.query;
  // const { data } = useCategoryTree();
  const data = useCategoryTree();

  const gender = category && (category as string)[0];
  const main = category && (category as string).slice(0, 4);
  const sub = category && (category as string);
  const genderSelectMenu = data && categoryIdNameCodeArr(data);
  const genderQuery = gender || genderSelectMenu[0].id || '-1';

  const mainCategory = useMainCategoryTree(genderQuery); // TODO: 2번 렌더링됨
  const mainSelectMenu = categoryIdNameCodeArr(mainCategory);
  const isIncludeMain =
    main && curCategoryChildrenByProp(mainCategory, 'id').includes(main);
  const mainQuery = isIncludeMain ? main : mainSelectMenu[0].id || '-1';

  const subCategory = useSubCategory(mainQuery, 'id');
  const { breadCrumb } = subCategory;
  const subSelectMenu = categoryIdNameCodeArr(subCategory);
  const isIncludeSub =
    sub && curCategoryChildrenByProp(subCategory, 'id').includes(sub);
  const existingSubMenu =
    subSelectMenu.length && subSelectMenu[0].id ? subSelectMenu[0].id : '-1';
  const subQuery = isIncludeSub ? sub : existingSubMenu;

  const orderQuery = (order as string) || orderData[0].code;
  const hideSoldQuery = (hideSold as string) || 'true';

  return (
    <>
      <HeadMeta title="re:Fashion | 상품 피드" url={`${seoData.url}/shop`} />

      <ShopHeader
        {...{
          genderQuery,
          mainQuery,
          subQuery,
          orderQuery,
          hideSoldQuery,
          genderSelectMenu,
          mainSelectMenu,
          subSelectMenu,
          breadCrumb,
        }}
      />

      <ProductItemList />
    </>
  );
}

Shop.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default Shop;
