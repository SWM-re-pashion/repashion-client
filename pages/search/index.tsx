/* eslint-disable camelcase */
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

import { ReactElement, useCallback } from 'react';

import HeadMeta from '@atoms/HeadMeta';
import { searchQueries, searchQueryData } from '@constants/queryString';
import { queryKey } from '@constants/react-query';
import { seoData } from '@constants/seo';
import Footer from '@organisms/Footer';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Layout from '@templates/Layout';
import { withGetServerSideProps } from 'api/core/withGetServerSideProps';
import { getSearchingItemList } from 'api/search';
import { getInfiniteProducts } from 'api/shop';
import Keywords from 'components/Search/organisms/Keywords';
import LatestProducts from 'components/Search/organisms/LatestProducts';
import SearchBar from 'components/Search/organisms/SearchBar';
import ProductItemList from 'components/Shop/Organisms/ProductItemList';
import { useMounted, useMultipleSearch, useQueryRouter } from 'hooks';
import { useSearchStore } from 'store/useSearchStore';
import { getQueriesArr, getQueryStringObj } from 'utils';

import $ from './style.module.scss';

export const getServerSideProps = withGetServerSideProps(
  async ({ query }: GetServerSidePropsContext) => {
    const { value, hide_sold, order } = query;
    const queryArr = [value, hide_sold, order];

    const queryObj = getQueriesArr(searchQueryData, queryArr);
    const queryStringObj = getQueryStringObj(queryObj);
    const queryClient = new QueryClient();

    await queryClient.fetchInfiniteQuery(
      queryKey.searchingItemList(queryStringObj),
      getInfiniteProducts({ queryStringObj, apiFunc: getSearchingItemList }),
      {
        getNextPageParam: ({ pagination: { isEndOfPage, pageNumber } }) => {
          return isEndOfPage ? undefined : pageNumber + 1;
        },
      },
    );

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
    };
  },
);

function SearchPage() {
  const router = useRouter();
  const queryFunc = useQueryRouter('value');
  const queryObj = useMultipleSearch(searchQueryData, searchQueries);
  const { value, hide_sold, order } = queryObj;
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
  const isExistSearchWord = !!value;

  if (!isMounted) return null;
  return (
    <>
      <HeadMeta
        title={`re:Fashion | ${
          value ? `${value} 상품 검색 결과` : '상품 검색'
        }`}
        url={`${seoData.url}/search`}
      />
      <SearchBar {...{ addKeyword, searchWord: value }} />
      <section className={$['search-body']}>
        {isExistSearchWord ? (
          <ProductItemList
            paddingTop="0px"
            isSearch
            {...{ queryStringObj: queryObj }}
          />
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
