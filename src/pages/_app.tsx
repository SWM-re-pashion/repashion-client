import { NextPage } from 'next';
import { AppContext, AppProps } from 'next/app';
import Head from 'next/head';

import React, { ReactElement, ReactNode, useEffect } from 'react';

import Toast from '@atoms/Toast';
import { ACCESSTOKEN } from '@constants/api';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '../styles/globals.scss';
import { Axios } from 'src/api/core';
import { useMounted, useWindowResize } from 'src/hooks';
import { getSSRAccessToken } from 'src/utils/auth';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3 * 60 * 1000,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const isMount = useMounted();
  const [_, height] = useWindowResize();
  const getLayout = Component.getLayout || ((page) => page);

  const setScreenSize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  useEffect(() => {
    if (isMount) setScreenSize();
  }, [height, isMount]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="중고 의류 마켓 re:Fashion" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <title>re:Fashion</title>
      </Head>
      <Toast />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          {getLayout(<Component {...pageProps} />)}
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const { ctx, Component } = context;
  let pageProps = {};
  const cookie = ctx.req?.headers.cookie || '';
  const token = getSSRAccessToken(ctx);
  Axios.defaults.headers.Cookie = '';
  Axios.defaults.headers[ACCESSTOKEN] = token;
  if (ctx.req && cookie) {
    Axios.defaults.headers.Cookie = cookie;
  }

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};

export default MyApp;
