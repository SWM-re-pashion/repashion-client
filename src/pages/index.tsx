import { ReactElement } from 'react';

import HeadMeta from '@atoms/HeadMeta';
import { seoData } from '@constants/seo';
import Footer from '@organisms/Footer';
import Layout from '@templates/Layout';
import RecommendListHeader from 'src/components/Main/molecules/RecommendListHeader';
import Introduction from 'src/components/Main/organisms/Introduction';
import MainHeader from 'src/components/Main/organisms/MainHeader';
import TodayRecommend from 'src/components/Main/organisms/TodayRecommend';
import ProductItemList from 'src/components/Shop/Organisms/ProductItemList';

import $ from '../styles/index.module.scss';

function Main() {
  const queryStringObj = { category: '3', hideSold: 'false', order: 'view' };

  return (
    <>
      <HeadMeta
        title="re:Fashion | 서비스 메인 페이지"
        url={`${seoData.url}`}
      />

      <section className={$.main}>
        <MainHeader />

        <TodayRecommend />

        <Introduction />

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

Main.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default Main;
