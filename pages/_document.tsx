import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head></Head>
        <body>
          <Main />
          <NextScript />
          <Script
            src="https://developers.kakao.com/sdk/js/kakao.js"
            strategy="afterInteractive"
          ></Script>
        </body>
      </Html>
    );
  }
}
