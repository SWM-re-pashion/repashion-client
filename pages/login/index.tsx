import Image from 'next/image';
import { useRouter } from 'next/router';

import HeadMeta from '@atoms/HeadMeta';
import { Google, Kakao } from '@atoms/icon';
import FooterWrapper from '@molecules/FooterWrapper';
import { SocialLoginBtn } from '@molecules/SocialLoginBtn';
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

      <section className={$.login}>
        <Image
          src="/images/desktop-login.png"
          alt="로그인 화면 이미지"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
        <h1 className={$.title}>re:Fashion</h1>
        {/* <span className={$.decription}>세컨핸드 의류에 새 생명을</span> */}

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

export default Login;
