import { useRouter } from 'next/router';

import { ReactElement } from 'react';

import ButtonFooter from '@atoms/ButtonFooter';
import HeadMeta from '@atoms/HeadMeta';
import { Ellipse, Star, Rectangle, Polygon } from '@atoms/icon';
import { seoData } from '@constants/seo';
import Layout from '@templates/Layout';
import classnames from 'classnames';

import $ from '../styles/index.module.scss';

function OnBoarding() {
  const router = useRouter();
  const handleClick = () => router.push('/login');

  return (
    <>
      <HeadMeta />

      <section className={$['on-boarding']}>
        <Ellipse className={classnames($.icon, $.ellipse)} />
        <Star className={classnames($.icon, $.star)} />
        <Polygon className={classnames($.icon, $.polygon)} />
        <Rectangle className={classnames($.icon, $.rectangle)} />
        <h1 className={$.title}>re:Fashion</h1>
        <span className={$.decription}>
          recommend individual outfit from secondhand
        </span>

        <ButtonFooter btnColor="#4a4a4a" onClick={handleClick}>
          시작하기
        </ButtonFooter>
      </section>
    </>
  );
}

OnBoarding.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default OnBoarding;
