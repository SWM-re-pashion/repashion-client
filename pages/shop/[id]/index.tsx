import { GetServerSidePropsContext } from 'next';

import { useCallback } from 'react';

import HeadMeta from '@atoms/HeadMeta';
import { seoData } from '@constants/seo';
import Profile from '@molecules/Profile';
import ImgSlide from '@organisms/ImgSlide';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Layout from '@templates/Layout';
import NotFound from '@templates/NotFound';
import { withGetServerSideProps } from 'api/core/withGetServerSideProps';
import { getProductDetail, useProdutDetail } from 'api/product';
import SellerComment from 'components/Product/molecules/SellerComment';
import ProductBasic from 'components/Product/organisms/ProductBasic';
import ProductFooter from 'components/Product/organisms/ProductFooter';
import ProductNotice from 'components/Product/organisms/ProductNotice';
import ProductSize from 'components/Product/organisms/ProductSize';
import { useSearchStore } from 'store/useSearchStore';

import $ from './style.module.scss';

export const getServerSideProps = withGetServerSideProps(
  async ({ params }: GetServerSidePropsContext) => {
    const queryClient = new QueryClient();
    const id = params?.id;
    const paramId = (typeof id !== 'object' && id) || '0';

    await queryClient.fetchQuery(['styles'], () => getProductDetail(paramId));

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        id: paramId,
      },
    };
  },
);

function ShopDetail({ id }: { id: string }) {
  const { data } = useProdutDetail(id);
  const addProduct = useSearchStore(
    useCallback((state) => state.addProduct, []),
  );
  const detailData = data?.data;

  if (detailData) {
    const { isMe, sellerInfo, basic, sellerNotice, measure } = detailData;
    const { opinion, price, isIncludeDelivery, updatedAt, like, views } =
      detailData;
    addProduct({ id: +id, img: sellerInfo.image[0] }); // TODO: 실험해볼 것
    return (
      <>
        <HeadMeta
          title="re:Fashion | 상품 상세보기"
          url={`${seoData.url}/shop/${id}`}
        />

        <Layout noPadding className={$['shop-detail-layout']}>
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
              footer={{
                ...{ price, isIncludeDelivery, updatedAt, like, views },
              }}
            >
              연락하기
            </ProductFooter>
          </section>
        </Layout>
      </>
    );
  }
  return null;
}

export default ShopDetail;
