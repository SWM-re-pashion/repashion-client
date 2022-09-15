import { useRouter } from 'next/router';

import { ReactElement, useEffect } from 'react';

import HeadMeta from '@atoms/HeadMeta';
import { seoData } from '@constants/seo';
import Footer from '@organisms/Footer';
import Layout from '@templates/Layout';
import SearchBar from 'components/Search/organisms/SearchBar';
import ProductItemList from 'components/Shop/Organisms/ProductItemList';

import $ from './style.module.scss';

function Search() {
  const router = useRouter();
  const { search, order, hideSold } = router.query;

  return (
    <>
      <HeadMeta title="re:Fashion | 상품 검색" url={`${seoData.url}/search`} />
      <SearchBar />
      <ProductItemList />

      <Footer />
    </>
  );
}

Search.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default Search;
