import { ReactElement } from 'react';

import { shopDetail } from '@mocks/index';
import ImgSlide from '@organisms/ImgSlide';
import Layout from '@templates/Layout';
import ProductBasic from 'components/Product/molecules/ProductBasic';
import ProductNotice from 'components/Product/molecules/ProductNotice';

import $ from './style.module.scss';
import ProductSize from 'components/Product/molecules/ProductSize';
import SellerComment from 'components/Product/molecules/SellerComment';
import Profile from '@molecules/Profile';

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
      </section>
    </>
  );
}

ShopDetail.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default ShopDetail;
