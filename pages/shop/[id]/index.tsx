import { GetStaticPropsContext } from 'next';

import { ReactElement } from 'react';
import { dehydrate, QueryClient } from 'react-query';

import Profile from '@molecules/Profile';
import ImgSlide from '@organisms/ImgSlide';
import Layout from '@templates/Layout';
import { getProductDetail, useProdutDetail } from 'api/product';
import SellerComment from 'components/Product/molecules/SellerComment';
import ProductBasic from 'components/Product/organisms/ProductBasic';
import ProductFooter from 'components/Product/organisms/ProductFooter';
import ProductNotice from 'components/Product/organisms/ProductNotice';
import ProductSize from 'components/Product/organisms/ProductSize';

import $ from './style.module.scss';

export async function getServerSideProps({ params }: GetStaticPropsContext) {
  const queryClient = new QueryClient();
  const id = params?.id;
  const paramId = (typeof id !== 'object' && id) || '0';

  await queryClient.prefetchQuery('styles', () => getProductDetail(paramId));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id: paramId,
    },
  };
}

function ShopDetail({ id }: { id: string }) {
  const { isLoading, isError, data } = useProdutDetail(id);
  const detailData = data?.data;

  if (detailData) {
    const { isMe, sellerInfo, basic, sellerNotice, measure } = detailData;
    const { opinion, price, isIncludeDelivery, updatedAt, like, views } =
      detailData;
    return (
      <>
        <ImgSlide imgList={sellerInfo.image} />
        <Profile profile={sellerInfo} />
        <section className={$['shop-detail-info']}>
          <ProductBasic basic={basic} />
          <ProductNotice sellerNotice={sellerNotice} />
          {measure.length && (
            <ProductSize size={measure} kind={basic.classification} />
          )}
          {opinion && (
            <SellerComment opinion={opinion} src={sellerInfo.profileImg} />
          )}
          <ProductFooter
            footer={{ ...{ price, isIncludeDelivery, updatedAt, like, views } }}
          >
            연락하기
          </ProductFooter>
        </section>
      </>
    );
  }
  return null; // Todo: 404페이지 보여줘야함. 데이터 fetching 실패했을 때, 로딩, 에러
}

ShopDetail.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout noPadding decreaseHeight={100}>
      {page}
    </Layout>
  );
};

export default ShopDetail;
