/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */
import { useRouter } from 'next/router';

import { ReactElement, useState, useCallback } from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';

import ButtonFooter from '@atoms/ButtonFooter';
import ImgBox from '@atoms/ImgBox';
import InfoHeader from '@molecules/InfoHeader';
import InfoPageNum from '@molecules/InfoPageNum';
import Layout from '@templates/Layout';
import { getStyleImg } from 'api/getStyleImg';
import { NextPageWithLayout } from 'pages/_app';
import { useInfoStore } from 'store/useInfoStore';

import $ from './style.module.scss';

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('styles', getStyleImg);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const skeletonImgBox = Array.from({ length: 20 });

export const StyleInfo: NextPageWithLayout = () => {
  const state = useInfoStore((stat) => stat);
  const handleClick = useInfoStore(useCallback((stat) => stat.infoUpdate, []));
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();
  const { isLoading, isError, data } = useQuery('styles', getStyleImg, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

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
      <InfoPageNum>1/3</InfoPageNum>

      <InfoHeader title="style" style={{ marginBottom: '17px' }} required>
        선호하는 이미지를 선택주세요.
        <br /> 2개 이상 선택 가능해요.
      </InfoHeader>

      <section className={$['style-info']}>
        {data &&
          data?.styles.length !== 0 &&
          data.styles.map(({ id, src, alt }) => (
            <ImgBox
              {...{ id, src, alt }}
              key={src + id}
              isNeedClick
              isSelected={state.styles.includes(id)}
              handleClick={handleClick}
            />
          ))}

        {isLoading &&
          skeletonImgBox.map((_, idx) => (
            <ImgBox key={`skeleton-${idx}`} isLoading />
          ))}
        {(isError || data?.styles.length === 0) && <p>오류가 발생했습니다.</p>}
      </section>

      {!isError && data?.styles.length !== 0 ? (
        <ButtonFooter onClick={handleSubmit} msg={errorMsg}>
          다음
        </ButtonFooter>
      ) : (
        <ButtonFooter onClick={handleErrorSubmit}>건너뛰기</ButtonFooter>
      )}
    </>
  );
};

StyleInfo.getLayout = function getLayout(page: ReactElement) {
  return <Layout decreaseHeight={80}>{page}</Layout>;
};

export default StyleInfo;
