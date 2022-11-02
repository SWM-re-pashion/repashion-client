import { useRouter } from 'next/router';

import { ReactElement, useCallback, useEffect } from 'react';

import ButtonFooter from '@atoms/ButtonFooter';
import HeadMeta from '@atoms/HeadMeta';
import { ISR_WEEK } from '@constants/api';
import { colorBtnProps } from '@constants/colorInfo/constants';
import { queryKey } from '@constants/react-query';
import { seoData } from '@constants/seo';
import InfoHeader from '@molecules/InfoHeader';
import InfoPageNum from '@molecules/InfoPageNum';
import InfoBtnBox from '@organisms/InfoBtnBox';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Layout from '@templates/Layout';
import { withGetServerSideProps } from 'src/api/core/withGetServerSideProps';
import { getStaticData } from 'src/api/staticData';
import { usePostPreference } from 'src/hooks/api/preference';
import { useStaticData } from 'src/hooks/api/staticData';
import { useInfoStore } from 'src/store/useInfoStore';
import { refinePreferenceData } from 'src/utils/preference.utils';

import $ from './style.module.scss';

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery(queryKey.staticData('Color'), () =>
    getStaticData('Color'),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: ISR_WEEK,
  };
};

export function ColorInfo() {
  const state = useInfoStore((stat) => stat);
  const handleClick = useInfoStore(useCallback((stat) => stat.infoUpdate, []));
  const { isLoading, data } = useStaticData<res.KindStaticData>('Color');
  const { mutate } = usePostPreference();
  const router = useRouter();
  const colorData = [data?.data.top, data?.data.bottom];

  useEffect(() => {
    const { bodyShape, height, gender } = state;
    if (!(bodyShape && height && gender)) router.push('/info/basic');
  }, []);

  const handleSubmit = () => mutate(refinePreferenceData(state));

  return (
    <>
      <HeadMeta
        title="re:Fashion | 추천을 위한 선호 색상 입력"
        url={`${seoData.url}/info/color`}
      />

      <InfoPageNum>2/2</InfoPageNum>

      <InfoHeader title="color">
        선호하는 컬러를 알려주세요.
        <br /> 여러 개 선택하는 것도 가능해요.
      </InfoHeader>

      {!isLoading &&
        data &&
        colorData &&
        colorBtnProps.map((options, idx) => {
          const eachData = colorData[idx];
          if (eachData)
            return (
              <InfoBtnBox
                {...options}
                key={options.label}
                datas={eachData}
                compareData={state[options.type]}
                handleFunc={handleClick}
              />
            );
          return null;
        })}

      <ButtonFooter onClick={handleSubmit}>입력완료</ButtonFooter>
    </>
  );
}

ColorInfo.getLayout = function getLayout(page: ReactElement) {
  return <Layout className={$['color-info-layout']}>{page}</Layout>;
};

export default ColorInfo;
