/* eslint-disable no-unsafe-optional-chaining */
import { useRouter } from 'next/router';

import { ReactElement, useEffect } from 'react';
import { dehydrate, QueryClient } from 'react-query';

import HeadMeta from '@atoms/HeadMeta';
import { seoData } from '@constants/seo';
import Layout from '@templates/Layout';
import { getCategoryData, useCategoryTree } from 'api/getCategoryData';
import ProductItemList from 'components/Shop/Organisms/ProductItemList';
import ShopHeader from 'components/Shop/Organisms/ShopHeader';

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
  const { gender, main, sub, sort, hideSold } = router.query;
  // const { data } = useCategoryTree();
  const data = useCategoryTree();

  return (
    <>
      <HeadMeta title="re:Fashion | 상품 피드" url={`${seoData.url}/shop`} />

      <ShopHeader {...{ data, gender, main, sub, sort, hideSold }} />

      <ProductItemList />
    </>
  );
}

Shop.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout noPadding headerHeight={235}>
      {page}
    </Layout>
  );
};

export default Shop;
