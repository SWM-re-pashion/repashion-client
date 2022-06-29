import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import Head from 'next/head';

function App({ Component, pageProps }: AppProps) {
  return (
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
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default App;
