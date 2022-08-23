/* eslint-disable react/function-component-definition */
import { useRouter } from 'next/router';

import { ReactElement } from 'react';

import { Ellipse, Polygon, Rectangle, Star } from '@atoms/icon';
import ImgButton from '@atoms/ImgButton';
import Layout from '@templates/Layout';
import classnames from 'classnames';

import { NextPageWithLayout } from '../_app';
import $ from './style.module.scss';

const Login: NextPageWithLayout = () => {
  const router = useRouter();

  const loginWithKakao = () => {
    router.push(`${process.env.KAKAO_OAUTH_URL}`);
  };

  const loginWithGoogle = () => {
    router.push(`${process.env.GOOGLE_OAUTH_URL}`);
  };

  return (
    <section className={$['on-boarding']}>
      <Ellipse className={classnames($.icon, $.ellipse)} />
      <Star className={classnames($.icon, $.star)} />
      <Polygon className={classnames($.icon, $.polygon)} />
      <Rectangle className={classnames($.icon, $.rectangle)} />
      <h1 className={$.title}>re:Fashion</h1>
      <span className={$.decription}>
        recommend individual outfit from secondhand
      </span>

      <footer className={$.footer}>
        <ImgButton
          src="/images/kakao_large_narrow.png"
          alt="카카오 로그인"
          width={191}
          height={46}
          onClick={loginWithKakao}
        />
        <ImgButton
          src="/images/google_dark_normal.png"
          alt="구글 로그인"
          width={197}
          height={47.5}
          onClick={loginWithGoogle}
        />
      </footer>
    </section>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default Login;
