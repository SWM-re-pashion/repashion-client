import { GetServerSidePropsContext } from 'next';

import { useCallback } from 'react';

import HeadMeta from '@atoms/HeadMeta';
import Profile from '@molecules/Profile';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Layout from '@templates/Layout';
import { withGetServerSideProps } from 'src/api/core/withGetServerSideProps';
import { getProductDetail } from 'src/api/product';
import SellerComment from 'src/components/Product/molecules/SellerComment';
import ProductBasic from 'src/components/Product/organisms/ProductBasic';
import ProductFooter from 'src/components/Product/organisms/ProductFooter';
import ProductImgSlide from 'src/components/Product/organisms/ProductImgSlide';
import ProductNotice from 'src/components/Product/organisms/ProductNotice';
import ProductSize from 'src/components/Product/organisms/ProductSize';
import { seoData } from '@constants/seo';
import { useProdutDetail } from 'src/hooks/api/product';
import { useSearchStore } from 'src/store/useSearchStore';

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
    const status = 'soldout'; // TODO: 백엔드와 협의
    addProduct({ id: +id, img: sellerInfo.image[0] });

    return (
      <>
        <HeadMeta
          title="re:Fashion | 상품 상세보기"
          url={`${seoData.url}/shop/${id}`}
        />

        <Layout noPadding className={$['shop-detail-layout']}>
          <ProductImgSlide
            {...{ id, isMe, status, imgList: sellerInfo.image }}
          />
          <Profile profile={sellerInfo} />
          <section className={$['shop-detail-info']}>
            <ProductBasic basic={basic} />
            <ProductNotice sellerNotice={sellerNotice} />
            {measure && (
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
