import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import React, { ReactElement, ReactNode, useEffect } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import Toast from '@atoms/Toast';
import { useMounted, useWindowResize } from 'hooks';

import '../styles/globals.scss';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const isMount = useMounted();
  const [_, height] = useWindowResize();
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 3 * 60 * 1000,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );
  const getLayout = Component.getLayout || ((page) => page);

  const setScreenSize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  useEffect(() => {
    if (isMount) setScreenSize();
  }, [height, isMount]);

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="중고 의류 마켓 re:Fashion" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <title>re:Fashion</title>
      </Head>
      <Hydrate state={pageProps.dehydratedState}>
        {getLayout(<Component {...pageProps} />)}
        <Toast />
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default App;
