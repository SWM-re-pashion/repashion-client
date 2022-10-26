import { useRouter } from 'next/router';

import { ReactElement, useCallback, ChangeEvent, useRef } from 'react';

import ButtonFooter from '@atoms/ButtonFooter';
import HeadMeta from '@atoms/HeadMeta';
import Span from '@atoms/Span';
import TextInput from '@atoms/TextInput';
import { ISR_WEEK } from '@constants/api';
import { basicBtnProps } from '@constants/basicInfo/constants';
import { queryKey } from '@constants/react-query';
import { seoData } from '@constants/seo';
import InfoArticle from '@molecules/InfoArticle';
import InfoHeader from '@molecules/InfoHeader';
import InfoPageNum from '@molecules/InfoPageNum';
import InfoBtnBox from '@organisms/InfoBtnBox';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Layout from '@templates/Layout';
import { withGetServerSideProps } from 'src/api/core/withGetServerSideProps';
import { getStaticData } from 'src/api/staticData';
import { useStaticData } from 'src/hooks/api/staticData';
import { useInfoStore } from 'src/store/useInfoStore';
import { filterHeight } from 'src/utils/filterValue';
import { toastError } from 'src/utils/toaster';

import $ from './style.module.scss';

export const getStaticProps = withGetServerSideProps(async () => {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery(queryKey.staticData('Gender'), () =>
    getStaticData('Gender'),
  );
  await queryClient.fetchQuery(queryKey.staticData('BodyShape'), () =>
    getStaticData('BodyShape'),
  );
  await queryClient.fetchQuery(queryKey.staticData('Size'), () =>
    getStaticData('Size'),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: ISR_WEEK,
  };
});

export function BasicInfo() {
  const state = useInfoStore((stat) => stat);
  const inputRef = useRef<HTMLInputElement>(null);
  const updateInfo = useInfoStore(useCallback((stat) => stat.infoUpdate, []));
  const router = useRouter();
  const {
    isLoading: genderIsLoading,
    isError: genderIsError,
    data: genderData,
  } = useStaticData<res.StaticData>('Gender');
  const {
    isLoading: bodyIsLoading,
    isError: bodyIsError,
    data: bodyData,
  } = useStaticData<res.StaticData>('BodyShape');
  const {
    isLoading: sizeIsLoading,
    isError: sizeIsError,
    data: sizeData,
  } = useStaticData<res.KindStaticData>('Size');
  const restData = [bodyData?.data, sizeData?.data.top, sizeData?.data.bottom];

  const heightChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    const value = filterHeight(e.target.value);
    e.target.value = value;
  };

  const verifyHeight = (value: string) => {
    return +value < 130 || +value > 200 || !value;
  };

  const submitCallback = () => {
    if (!state.gender || !state.bodyShape) {
      toastError({ message: '필수 항목을 입력해주세요.' });
    } else if (inputRef.current && verifyHeight(inputRef.current.value)) {
      toastError({ message: '130 ~ 200 범위의 키를 입력해주세요.' });
      inputRef.current.focus();
    } else {
      if (inputRef.current && updateInfo)
        updateInfo(+inputRef.current.value, 'height');
      router.push('/info/color');
    }
  };

  const handleHeightChange = useCallback(heightChangeCallback, []);
  const handleSubmit = useCallback(submitCallback, [
    state.gender,
    state.bodyShape,
    updateInfo,
    router,
  ]);

  return (
    <>
      <HeadMeta
        title="re:Fashion | 추천을 위한 기본 정보 입력"
        url={`${seoData.url}/info/basic`}
      />

      <InfoPageNum>1/2</InfoPageNum>
      <InfoHeader title="basic">
        성별, 키, 체형 및 사이즈를 알려주세요.
        <br /> 사이즈는 복수 선택도 가능해요.
      </InfoHeader>
      {genderData && genderData?.data && (
        <InfoBtnBox
          {...basicBtnProps[0]}
          datas={genderData.data}
          compareData={state[basicBtnProps[0].type]}
          handleFunc={updateInfo}
        />
      )}

      <InfoArticle label="키" required>
        <div className={$['height-input']}>
          <TextInput
            controlled={false}
            placeholder="130 ~ 200 범위의 키를 입력해주세요."
            onChange={handleHeightChange}
            value={state.height.toString()}
            ref={inputRef}
          />
          <Span className={$['height-cm']}>cm</Span>
        </div>
      </InfoArticle>

      {bodyData &&
        sizeData &&
        basicBtnProps.slice(1).map((options, idx) => {
          const eachData = restData[idx];
          if (eachData)
            return (
              <InfoBtnBox
                {...options}
                datas={eachData}
                key={options.label}
                compareData={state[options.type]}
                handleFunc={updateInfo}
              />
            );
          return null;
        })}

      <ButtonFooter onClick={handleSubmit}>다음</ButtonFooter>
    </>
  );
}

BasicInfo.getLayout = function getLayout(page: ReactElement) {
  return <Layout className={$['basic-info-layout']}>{page}</Layout>;
};

export default BasicInfo;
