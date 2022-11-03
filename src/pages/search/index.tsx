import { GetServerSidePropsContext } from 'next';

import { ReactElement } from 'react';

import HeadMeta from '@atoms/HeadMeta';
import { searchQueries, searchQueryData } from '@constants/queryString';
import { queryKey } from '@constants/react-query';
import { seoData } from '@constants/seo';
import Footer from '@organisms/Footer';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Layout from '@templates/Layout';
import { withGetServerSideProps } from 'src/api/core/withGetServerSideProps';
import { getSearchingItemList } from 'src/api/search';
import { getInfiniteProducts } from 'src/api/shop';
import SearchBody from 'src/components/Search/organisms/SearchBody';
import SearchHeader from 'src/components/Search/organisms/SearchHeader';
import { useMounted, useMultipleSearch } from 'src/hooks';
import { getQueriesArr, getQueryStringObj } from 'src/utils';

export const getServerSideProps = withGetServerSideProps(
  async ({ query }: GetServerSidePropsContext) => {
    const { value, hideSold, order } = query;
    const queryArr = [value, hideSold, order];

    const queryObj = getQueriesArr(searchQueryData, queryArr);
    const queryStringObj = getQueryStringObj(queryObj);
    const queryClient = new QueryClient();

    if (value) {
      await queryClient.fetchInfiniteQuery(
        queryKey.searchingItemList(queryStringObj),
        getInfiniteProducts({ queryStringObj, apiFunc: getSearchingItemList }),
        {
          getNextPageParam: ({ pagination: { isEndOfPage, pageNumber } }) => {
            return isEndOfPage ? undefined : pageNumber + 1;
          },
        },
      );
    }

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
    };
  },
);

function SearchPage() {
  const queryStringObj = useMultipleSearch(searchQueryData, searchQueries);
  const { value, hideSold, order } = queryStringObj;

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
          hideSoldQuery: hideSold,
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
