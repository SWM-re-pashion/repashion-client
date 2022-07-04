import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import React, { ReactElement, ReactNode } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { RecoilRoot } from 'recoil';
import '../styles/globals.scss';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = React.useState(() => new QueryClient());
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Head>
          <meta charSet="utf-8" />
          <meta name="description" content="중고 의류 마켓 refashion" />
          <meta
            name="viewport"
            content="initial-scale=1, maximum-scale=1, width=device-width, 
      shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          />
          <title>refashion</title>
        </Head>
        <Hydrate state={pageProps.dehydratedState}>
          {getLayout(<Component {...pageProps} />)}
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
