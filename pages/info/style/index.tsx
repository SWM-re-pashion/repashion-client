/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */
import { useRouter } from 'next/router';

import { ReactElement, useState, useCallback } from 'react';

import ButtonFooter from '@atoms/ButtonFooter';
import ImgBox from '@atoms/ImgBox';
import InfoHeader from '@molecules/InfoHeader';
import InfoPageNum from '@molecules/InfoPageNum';
import Layout from '@templates/Layout';
import { NextPageWithLayout } from 'pages/_app';
import { useInfoStore } from 'store/useInfoStore';

import $ from './style.module.scss';

const EXAMPLE_URL =
  'https://images.unsplash.com/photo-1618588507085-c79565432917?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmVhdXRpZnVsJTIwbmF0dXJlfGVufDB8fDB8fA%3D%3D&w=1000&q=80';

export const StyleInfo: NextPageWithLayout = () => {
  const state = useInfoStore((stat) => stat);
  const handleClick = useInfoStore(useCallback((stat) => stat.infoUpdate, []));
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const imgBoxMocks = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    src: EXAMPLE_URL,
  }));

  const handleSubmit = () => {
    if (state.styles.length < 2) {
      setErrorMsg('이미지를 2개 이상 선택해주세요.');
    } else {
      setErrorMsg('');
      router.push('/info/basic');
    }
  };

  return (
    <>
      <InfoPageNum>1/3</InfoPageNum>

      <InfoHeader title="style" style={{ marginBottom: '17px' }} required>
        선호하는 이미지를 선택주세요.
        <br /> 2개 이상 선택 가능해요.
      </InfoHeader>
      <section className={$['style-info']}>
        {imgBoxMocks.map(({ id, src }) => (
          <ImgBox
            id={id}
            key={src + id}
            src={src}
            alt={`${id}번 이미지`}
            isNeedClick
            isSelected={state.styles.includes(id)}
            handleClick={handleClick}
          />
        ))}
      </section>
      <ButtonFooter onClick={handleSubmit} msg={errorMsg}>
        다음
      </ButtonFooter>
    </>
  );
};

StyleInfo.getLayout = function getLayout(page: ReactElement) {
  return <Layout decreaseHeight={80}>{page}</Layout>;
};

export default StyleInfo;
