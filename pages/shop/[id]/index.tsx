import { ReactElement } from 'react';

import { shopDetail } from '@mocks/index';
import Profile from '@molecules/Profile';
import ImgSlide from '@organisms/ImgSlide';
import Layout from '@templates/Layout';
import SellerComment from 'components/Product/molecules/SellerComment';
import ProductBasic from 'components/Product/organisms/ProductBasic';
import ProductFooter from 'components/Product/organisms/ProductFooter';
import ProductNotice from 'components/Product/organisms/ProductNotice';
import ProductSize from 'components/Product/organisms/ProductSize';

import $ from './style.module.scss';

function ShopDetail() {
  const {
    isMe,
    sellerInfo,
    image,
    basic,
    sellerNotice,
    measure,
    opinion,
    price,
    isIncludeDelivery,
    updatedAt,
    like,
    views,
  } = shopDetail;

  return (
    <>
      <ImgSlide imgList={image} />
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

ShopDetail.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout noPadding decreaseHeight={100}>
      {page}
    </Layout>
  );
};

export default ShopDetail;
