/* eslint-disable react/function-component-definition */
import { useRouter } from 'next/router';

import { ReactElement } from 'react';

import classnames from 'classnames';

import ButtonFooter from '@atoms/ButtonFooter';
import { Ellipse, Star, Rectangle, Polygon } from '@atoms/icon';
import Layout from '@templates/Layout';

import $ from '../styles/index.module.scss';
import { NextPageWithLayout } from './_app';

const OnBoarding: NextPageWithLayout = () => {
  const router = useRouter();
  const handleClick = () => router.push('/login');

  return (
    <section className={$['on-boarding']}>
      <Ellipse className={classnames($.icon, $.ellipse)} />
      <Star className={classnames($.icon, $.star)} />
      <Polygon className={classnames($.icon, $.polygon)} />
      <Rectangle className={classnames($.icon, $.rectangle)} />
      <h1 className={$.title}>refashion</h1>
      <span className={$.decription}>
        recommend individual outfit from secondhand
      </span>

      <ButtonFooter btnColor="#4a4a4a" onClick={handleClick}>
        시작하기
      </ButtonFooter>
    </section>
  );
};

OnBoarding.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default OnBoarding;
