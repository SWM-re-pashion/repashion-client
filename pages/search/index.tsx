/* eslint-disable camelcase */
import { GetServerSidePropsContext } from 'next';

import { ReactElement } from 'react';

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
import SearchBody from 'components/Search/organisms/SearchBody';
import SearchHeader from 'components/Search/organisms/SearchHeader';
import { useMounted, useMultipleSearch } from 'hooks';
import { getQueriesArr, getQueryStringObj } from 'utils';

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
  const queryStringObj = useMultipleSearch(searchQueryData, searchQueries);
  const { value, hide_sold, order } = queryStringObj;

  const isMounted = useMounted();

  if (!isMounted) return null;
  return (
    <>
      <HeadMeta
        title={`re:Fashion | ${
          value ? `${value} 상품 검색 결과` : '상품 검색'
        }`}
        url={`${seoData.url}/search`}
      />
      <SearchHeader
        {...{
          searchWord: value,
          hideSoldQuery: hide_sold,
          orderQuery: order,
        }}
      />
      <SearchBody {...{ value, queryStringObj }} />
      <Footer />
    </>
  );
}

SearchPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default SearchPage;
