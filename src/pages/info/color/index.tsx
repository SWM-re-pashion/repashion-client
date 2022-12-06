import { useRouter } from 'next/router';

import { ReactElement, useCallback, useEffect } from 'react';

import HeadMeta from '@atoms/HeadMeta';
import Loading from '@atoms/Loading';
import { ISR_WEEK } from '@constants/api';
import { colorBtnProps } from '@constants/colorInfo/constants';
import { queryKey } from '@constants/react-query';
import { seoData } from '@constants/seo';
import ButtonFooter from '@molecules/ButtonFooter';
import InfoHeader from '@molecules/InfoHeader';
import InfoPageNum from '@molecules/InfoPageNum';
import InfoBtnBox from '@organisms/InfoBtnBox';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Layout from '@templates/Layout';
import { getStaticData } from 'src/api/staticData';
import { useAuthTest } from 'src/hooks/api/login';
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
  const { isSuccess } = useAuthTest();
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

  if (!isSuccess)
    return <Loading style={{ height: 'calc(var(--vh, 1vh) * 100)' }} />;
  return (
    <>
      <HeadMeta
        title="re:Fashion | 추천을 위한 선호 색상 입력"
        url={`${seoData.url}/info/color`}
      />

      <InfoPageNum>2/2</InfoPageNum>

      <InfoHeader
        title="color"
        description={
          '선호하는 컬러를 알려주세요.\n여러 개 선택하는 것도 가능해요.'
        }
      />

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
