import React, { ReactElement, useEffect } from 'react';

import BackBtn from '@atoms/BackBtn';
import Button from '@atoms/Button';
import Span from '@atoms/Span';
import { KAKAO_TALK_ONE_TO_ONE_CHAT } from '@constants/link';
import { seoData } from '@constants/seo';
import Layout from '@templates/Layout';
import PageTemplate from '@templates/PageTemplate';

import $ from './style.module.scss';

function Contact() {
  useEffect(() => {
    window.open(KAKAO_TALK_ONE_TO_ONE_CHAT, '_blank');
  }, []);

  return (
    <PageTemplate
      metaTitle="re:Fashion | 1:1 문의하기"
      metaUrl={`${seoData.url}/setting/contact`}
      title="1:1 문의하기"
      left={<BackBtn color="#000" />}
      isNeedFooter={false}
    >
      <section className={$['contact-page']}>
        <h1 className={$.title}>서비스 관리자에게 문의하기</h1>

        <Button className={$['chat-btn']}>
          <a href={KAKAO_TALK_ONE_TO_ONE_CHAT} target="_blank" rel="noreferrer">
            <Span fontSize={13}>1:1 채팅 시작하기</Span>
          </a>
        </Button>

        <Span fontSize={14} fontWeight={600}>
          자동으로 카카오톡으로 연결되지 않는다면,
        </Span>
        <Span fontSize={14} fontWeight={600}>
          위 버튼 클릭을 통해 진행해 주세요.
        </Span>
      </section>
    </PageTemplate>
  );
}

Contact.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default Contact;
