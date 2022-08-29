import { useRouter } from 'next/router';

import { ReactElement } from 'react';

import HeadMeta from '@atoms/HeadMeta';
import { Ellipse, Google, Kakao, Polygon, Rectangle, Star } from '@atoms/icon';
import FooterWrapper from '@molecules/FooterWrapper';
import { SocialLoginBtn } from '@molecules/SocialLoginBtn';
import Layout from '@templates/Layout';
import classnames from 'classnames';
import { seoData } from 'constants/seo';

import $ from './style.module.scss';

function Login() {
  const router = useRouter();

  const loginWithKakao = () => {
    router.push(`${process.env.KAKAO_OAUTH_URL}`);
  };

  const loginWithGoogle = () => {
    router.push(`${process.env.GOOGLE_OAUTH_URL}`);
  };

  return (
    <>
      <HeadMeta title="re:Fashion | 회원 로그인" url={`${seoData.url}/login`} />

      <section className={$['on-boarding']}>
        <Ellipse className={classnames($.icon, $.ellipse)} />
        <Star className={classnames($.icon, $.star)} />
        <Polygon className={classnames($.icon, $.polygon)} />
        <Rectangle className={classnames($.icon, $.rectangle)} />
        <h1 className={$.title}>re:Fashion</h1>
        <span className={$.decription}>
          recommend individual outfit from secondhand
        </span>

        <FooterWrapper>
          <SocialLoginBtn
            className={$['login-btn']}
            Logo={<Kakao style={{ padding: '6px' }} />}
            onClick={loginWithKakao}
            text="카카오 로그인"
            backgroundColor="#fee500"
            borderRadius="12px"
            hasBtnPadding
          />
          <SocialLoginBtn
            className={classnames($['login-btn'], $['google-login'])}
            Logo={<Google style={{ padding: '6px' }} />}
            onClick={loginWithGoogle}
            text="Google 계정으로 로그인"
            backgroundColor="#ffffff"
            borderRadius="12px"
            fontWeight={700}
            hasBtnPadding
          />
          {/* <SocialLoginBtn
          className={$['login-btn']}
          src="/images/apple_login_btn.png"
          alt="애플 로그인"
          onClick={loginWithKakao}
          text="Apple로 로그인"
          backgroundColor="#ffffff"
          borderRadius="12px"
        /> */}
        </FooterWrapper>
      </section>
    </>
  );
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default Login;
