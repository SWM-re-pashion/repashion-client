import { ReactElement } from 'react';

import { shopDetail } from '@mocks/index';
import ImgSlide from '@organisms/ImgSlide';
import Layout from '@templates/Layout';
import ProductBasic from 'components/Product/molecules/ProductBasic';
import ProductNotice from 'components/Product/molecules/ProductNotice';

import $ from './style.module.scss';
import ProductSize from 'components/Product/molecules/ProductSize';

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
      <section className={$['shop-detail-info']}>
        <ProductBasic basic={basic} />
        <ProductNotice sellerNotice={sellerNotice} />
        <ProductSize size={measure} kind={basic.classification} />
      </section>
    </>
  );
}

ShopDetail.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default ShopDetail;
