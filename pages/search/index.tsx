import { useRouter } from 'next/router';

import { ReactElement, useCallback, useEffect, useState } from 'react';

import HeadMeta from '@atoms/HeadMeta';
import { seoData } from '@constants/seo';
import Footer from '@organisms/Footer';
import Layout from '@templates/Layout';
import Keywords from 'components/Search/organisms/Keywords';
import SearchBar from 'components/Search/organisms/SearchBar';
import ProductItemList from 'components/Shop/Organisms/ProductItemList';
import { useMounted, useQueryRouter } from 'hooks';
import { useSearchStore } from 'store/useSearchStore';

import $ from './style.module.scss';

function SearchPage() {
  const router = useRouter();
  const queryFunc = useQueryRouter('word');
  const { keywords } = useSearchStore((state) => state);
  const addKeyword = useSearchStore(
    useCallback((state) => state.addKeyword, []),
  );
  const removeKeyword = useSearchStore(
    useCallback((state) => state.removeKeyword, []),
  );
  const isMounted = useMounted();
  const { word, order, hideSold } = router.query;
  const searchQuery = word as string;
  const isExistSearchWord = !!searchQuery;

  if (!isMounted) return null;
  return (
    <>
      <HeadMeta title="re:Fashion | 상품 검색" url={`${seoData.url}/search`} />
      <SearchBar {...{ addKeyword }} />
      <section className={$['search-body']}>
        {isExistSearchWord ? (
          <ProductItemList paddingTop="0px" />
        ) : (
          <Keywords {...{ keywords, removeKeyword, queryFunc }} />
        )}
      </section>
      <Footer />
    </>
  );
}

SearchPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default SearchPage;
