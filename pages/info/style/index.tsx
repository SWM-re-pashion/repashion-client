/* eslint-disable react/no-array-index-key */
import { useRouter } from 'next/router';

import { ReactElement, useState, useCallback } from 'react';

import ButtonFooter from '@atoms/ButtonFooter';
import HeadMeta from '@atoms/HeadMeta';
import ImgBox from '@atoms/ImgBox';
import { seoData } from '@constants/seo';
import InfoHeader from '@molecules/InfoHeader';
import InfoPageNum from '@molecules/InfoPageNum';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Layout from '@templates/Layout';
import { getStyleImgs, useStyleImgs } from 'api/getStyleImgs';
import { useInfoStore } from 'store/useInfoStore';

import $ from './style.module.scss';

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['styles'], getStyleImgs);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const skeletonImgBox = Array.from({ length: 20 });

export function StyleInfo() {
  const state = useInfoStore((stat) => stat);
  const handleClick = useInfoStore(useCallback((stat) => stat.infoUpdate, []));
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();
  const { isLoading, isError, data } = useStyleImgs();
  const styleImgs = data?.data;

  const handleSubmit = () => {
    if (state.styles.length < 2) {
      setErrorMsg('이미지를 2개 이상 선택해주세요.');
    } else {
      setErrorMsg('');
      router.push('/info/basic');
    }
  };

  const handleErrorSubmit = () => router.push('/info/basic');

  return (
    <>
      <HeadMeta
        title="re:Fashion | 추천을 위한 선호 스타일 이미지 선택"
        url={`${seoData.url}/info/style`}
      />

      <InfoPageNum>1/3</InfoPageNum>

      <InfoHeader title="style" style={{ marginBottom: '17px' }} required>
        선호하는 이미지를 선택주세요.
        <br /> 2개 이상 선택 가능해요.
      </InfoHeader>

      <section className={$['style-info']}>
        {styleImgs &&
          styleImgs?.styles.length !== 0 &&
          styleImgs.styles.map(({ id, src, alt }) => (
            <ImgBox
              {...{ id, src, alt }}
              key={src + id}
              isNeedClick
              isSelected={state.styles.includes(id)}
              onClick={handleClick}
            />
          ))}

        {isLoading &&
          skeletonImgBox.map((_, idx) => (
            <ImgBox key={`skeleton-${idx}`} isLoading />
          ))}
        {(isError || styleImgs?.styles.length === 0) && (
          <p>오류가 발생했습니다.</p>
        )}
      </section>

      {!isError && styleImgs?.styles.length !== 0 ? (
        <ButtonFooter onClick={handleSubmit} msg={errorMsg}>
          다음
        </ButtonFooter>
      ) : (
        <ButtonFooter onClick={handleErrorSubmit}>건너뛰기</ButtonFooter>
      )}
    </>
  );
}

StyleInfo.getLayout = function getLayout(page: ReactElement) {
  return <Layout decreaseHeight={80}>{page}</Layout>;
};

export default StyleInfo;
