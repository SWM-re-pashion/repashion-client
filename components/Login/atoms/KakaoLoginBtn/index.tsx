/* eslint-disable consistent-return */
import Image from 'next/image';

import { useEffect } from 'react';

import { REDIRECT_URI } from 'shared/OAuth';

export default function KakaoLoginBtn() {
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
    <button type="button" onClick={loginWithKakao}>
      <Image
        src="/images/kakao_large_wide.png"
        width="300"
        height="45"
        alt="카카오 로그인 버튼"
      />
    </button>
  );
}
