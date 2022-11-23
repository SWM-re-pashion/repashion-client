import { GetServerSidePropsContext } from 'next';

import { ReactElement } from 'react';

import ErrorFallback from '@atoms/ErrorFallback';
import HeadMeta from '@atoms/HeadMeta';
import { queryKey } from '@constants/react-query';
import { seoData } from '@constants/seo';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import AsyncBoundary from '@templates/AsyncBoundary';
import Layout from '@templates/Layout';
import { withGetServerSideProps } from 'src/api/core/withGetServerSideProps';
import { getProductDetail } from 'src/api/product';
import ProductDetail from 'src/components/Product/organisms/ProductDetail';
import ProductDetailSkeleton from 'src/components/Product/organisms/ProductDetail/Skeleton.view';
import ProductRecommend from 'src/components/Product/organisms/ProductRecommend';
import ProductRecommendSkeleton from 'src/components/Product/organisms/ProductRecommend/Skeleton/Skeleton.view';

export const getServerSideProps = withGetServerSideProps(
  async ({ params }: GetServerSidePropsContext) => {
    const queryClient = new QueryClient();
    const id = params?.id;
    const paramId = (typeof id !== 'object' && id) || '0';

    await queryClient.fetchQuery(queryKey.productDetail(paramId), () =>
      getProductDetail(paramId),
    );

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        id: paramId,
      },
    };
  },
);

function ShopDetail({ id }: { id: string }) {
  return (
    <>
      <HeadMeta
        title="re:Fashion | 상품 상세보기"
        url={`${seoData.url}/shop/${id}`}
      />

      <AsyncBoundary
        suspenseFallback={<ProductDetailSkeleton />}
        errorFallback={ErrorFallback}
      >
        <ProductDetail {...{ id }} />
      </AsyncBoundary>

      <AsyncBoundary
        suspenseFallback={<ProductRecommendSkeleton />}
        errorFallback={ErrorFallback}
      >
        <ProductRecommend {...{ id }} />
      </AsyncBoundary>
    </>
  );
}

ShopDetail.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout noPadding style={{ paddingBottom: '100px' }}>
      {page}
    </Layout>
  );
};

export default ShopDetail;
