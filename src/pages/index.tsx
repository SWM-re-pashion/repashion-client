import { ReactElement } from 'react';

import HeadMeta from '@atoms/HeadMeta';
import Footer from '@organisms/Footer';
import Layout from '@templates/Layout';
import MainHeader from 'src/components/Main/molecules/MainHeader';
import RecommendListHeader from 'src/components/Main/molecules/RecommendListHeader';
import ProductItemList from 'src/components/Shop/Organisms/ProductItemList';

import $ from '../styles/index.module.scss';

function OnBoarding() {
  const queryStringObj = { category: '3', hideSold: 'false', order: 'view' };

  return (
    <>
      <HeadMeta />

      <section className={$['on-boarding']}>
        <MainHeader />

        <RecommendListHeader />
        <ProductItemList
          type="recommend"
          paddingTop="0"
          queryStringObj={queryStringObj}
        />

        <Footer />
      </section>
    </>
  );
}

OnBoarding.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default OnBoarding;
