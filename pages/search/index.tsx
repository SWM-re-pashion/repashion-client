import { useRouter } from 'next/router';

import { ReactElement, useCallback } from 'react';

import HeadMeta from '@atoms/HeadMeta';
import { seoData } from '@constants/seo';
import Footer from '@organisms/Footer';
import Layout from '@templates/Layout';
import Keywords from 'components/Search/organisms/Keywords';
import LatestProducts from 'components/Search/organisms/LatestProducts';
import SearchBar from 'components/Search/organisms/SearchBar';
import ProductItemList from 'components/Shop/Organisms/ProductItemList';
import { useMounted, useQueryRouter, useSearch } from 'hooks';
import { useSearchStore } from 'store/useSearchStore';

import $ from './style.module.scss';

function SearchPage() {
  const router = useRouter();
  const queryFunc = useQueryRouter('word');
  const { keywords, latestProducts } = useSearchStore((state) => state);
  const addKeyword = useSearchStore(
    useCallback((state) => state.addKeyword, []),
  );
  const removeKeyword = useSearchStore(
    useCallback((state) => state.removeKeyword, []),
  );
  const removeProduct = useSearchStore(
    useCallback((state) => state.removeProduct, []),
  );
  const moveProduct = useCallback(
    (id: number) => router.push(`/shop/${id}`),
    [router],
  );

  const isMounted = useMounted();
  const word = useSearch('word');
  const order = useSearch('order');
  const hideSold = useSearch('hideSold');
  const searchWord = word as string;
  const isExistSearchWord = !!searchWord;

  if (!isMounted) return null;
  return (
    <>
      <HeadMeta title="re:Fashion | 상품 검색" url={`${seoData.url}/search`} />
      <SearchBar {...{ addKeyword, searchWord }} />
      <section className={$['search-body']}>
        {isExistSearchWord ? (
          <ProductItemList paddingTop="0px" />
        ) : (
          <>
            <Keywords {...{ keywords, removeKeyword, queryFunc }} />
            <LatestProducts
              {...{ products: latestProducts, removeProduct, moveProduct }}
            />
          </>
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
