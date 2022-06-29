import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import Head from 'next/head';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import React from 'react';

function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

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
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
