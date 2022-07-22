import { ReactElement } from 'react';

import { ProductBasicInfo, ProductNoticeInfo } from '#types/product';
import { shopDetail } from '@mocks/index';
import ImgSlide from '@organisms/ImgSlide';
import Layout from '@templates/Layout';
import ProductBasic from 'components/Product/molecules/ProductBasic';
import ProductNotice from 'components/Product/molecules/ProductNotice';

import $ from './style.module.scss';

function ShopDetail() {
  const {
    isMe,
    sellerInfo,
    basic,
    sellerNotice,
    measure,
    price,
    isIncludeDelivery,
  } = shopDetail;

  const productBasicInfo: ProductBasicInfo = { ...basic };
  const productNoticeInfo: ProductNoticeInfo = { ...sellerNotice };
  delete productBasicInfo.image;
  delete productNoticeInfo.opinion;

  return (
    <>
      <ImgSlide imgList={basic.image} />
      <section className={$['shop-detail-info']}>
        <ProductBasic basic={productBasicInfo} />
        <ProductNotice sellerNotice={productNoticeInfo} />
      </section>
    </>
  );
}

ShopDetail.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default ShopDetail;
