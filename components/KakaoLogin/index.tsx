import { useEffect } from 'react';
import { REDIRECT_URI } from 'shared/OAuth';
import Image from 'next/image';

export default function KakaoLoginBtn() {
  useEffect(() => {
    if (!window.Kakao.isInitialized() && window.Kakao)
      window.Kakao.init(process.env.KAKAO_KEY);
  }, []);

  function getCookie(name: string) {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    if (parts && parts.length === 2) return parts.pop().split(';').shift();
  }

  const loginWithKakao = () => {
    window.Kakao.Auth.authorize({
      redirectUri: REDIRECT_URI,
    });
  };

  const getAuthorizeToken = () => {
    const token = getCookie('authorize-access-token');
    if (token) {
      window.Kakao.Auth.setAccessToken(token);
      window.Kakao.Auth.getStatusInfo(({ status }) => {
        if (status === 'connected') {
          alert(window.Kakao.Auth.getAccessToken());
        } else {
          window.Kakao.Auth.setAccessToken(null);
        }
      });
    }
  };

  return (
    <button onClick={loginWithKakao}>
      <Image
        src="/images/kakao_large_wide.png"
        width="300"
        height="45"
        alt="카카오 로그인 버튼"
      />
    </button>
  );
}
