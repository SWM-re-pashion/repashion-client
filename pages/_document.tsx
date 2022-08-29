import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import Script from 'next/script';

import { data } from 'constants/seo';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={data.favicons.appleTouchIcon}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={data.favicons[32]}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={data.favicons[16]}
          />
          <link rel="manifest" href={data.favicons.manifest} />
          <link rel="shortcut icon" href={data.favicons.shortcut} />
          <link rel="mask-icon" href={data.favicons.maskIcon} color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="msapplication-TileImage" content={data.favicons.msTile} />
          <meta name="theme-color" content="#ffffff" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            as="style"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.4/dist/web/static/pretendard.css"
            crossOrigin=""
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* <Script
            src="https://developers.kakao.com/sdk/js/kakao.js"
            strategy="afterInteractive"
          /> */}
        </body>
      </Html>
    );
  }
}
