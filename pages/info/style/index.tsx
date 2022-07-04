/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */
import { ReactElement } from 'react';

import Button from 'components/shared/atoms/Button';
import ImgBox from 'components/shared/atoms/ImgBox';
import Layout from 'components/shared/templates/Layout';
import { NextPageWithLayout } from 'pages/_app';

import $ from './style.module.scss';

const EXAMPLE_URL =
  'https://images.unsplash.com/photo-1618588507085-c79565432917?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmVhdXRpZnVsJTIwbmF0dXJlfGVufDB8fDB8fA%3D%3D&w=1000&q=80';

export const StyleInfo: NextPageWithLayout = () => {
  const imgBoxMocks = Array.from({ length: 12 }, () => EXAMPLE_URL);

  return (
    <>
      <section className={$['style-info']}>
        {imgBoxMocks.map((src, idx) => (
          <ImgBox key={src + idx} src={src} alt="asdf" isNeedClick />
        ))}
      </section>
      <Button>다음</Button>
    </>
  );
};

StyleInfo.getLayout = function getLayout(page: ReactElement) {
  return <Layout decreaseHeight={80}>{page}</Layout>;
};

export default StyleInfo;
