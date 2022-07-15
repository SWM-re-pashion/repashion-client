/* eslint-disable react/function-component-definition */
import { ReactElement, useEffect } from 'react';

import ImgButton from '@atoms/ImgButton';
import Layout from '@templates/Layout';
import { REDIRECT_URI } from 'shared/OAuth';

import { NextPageWithLayout } from '../_app';
import $ from './style.module.scss';

const Login: NextPageWithLayout = () => {
  useEffect(() => {
    if (!window.Kakao.isInitialized() && window.Kakao)
      window.Kakao.init(process.env.KAKAO_KEY);
  }, []);

  const loginWithKakao = () => {
    window.Kakao.Auth.authorize({
      redirectUri: REDIRECT_URI,
    });
  };

  return (
    <section className={$.login}>
      <ImgButton
        src="/images/kakao_large_wide.png"
        alt="카카오 로그인"
        width={298}
        height={44.7}
        onClick={loginWithKakao}
      />
    </section>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Login;
