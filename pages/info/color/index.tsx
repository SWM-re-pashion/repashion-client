/* eslint-disable react/function-component-definition */
import { useRouter } from 'next/router';

import { ReactElement, useCallback, useEffect } from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';

import ButtonFooter from '@atoms/ButtonFooter';
import InfoHeader from '@molecules/InfoHeader';
import InfoPageNum from '@molecules/InfoPageNum';
import InfoBtnBox from '@organisms/InfoBtnBox';
import Layout from '@templates/Layout';
import { getColors } from 'api/getColors';
import { usePostPreference } from 'api/preference';
import { NextPageWithLayout } from 'pages/_app';
import { useInfoStore } from 'store/useInfoStore';

import { colorBtnProps } from '../../../constants/colorInfo/constants';

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('colors', getColors);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export const ColorInfo: NextPageWithLayout = () => {
  const state = useInfoStore((stat) => stat);
  const handleClick = useInfoStore(useCallback((stat) => stat.infoUpdate, []));
  const { isLoading, isError, data, error } = useQuery('colors', getColors);
  const { mutate } = usePostPreference();
  const router = useRouter();

  useEffect(() => {
    const { bodyShape, height, gender } = state;
    if (!(bodyShape && height && gender)) router.push('/info/basic');
  }, []);

  const handleSubmit = () => mutate(state);

  return (
    <>
      <InfoPageNum>3/3</InfoPageNum>

      <InfoHeader title="color">
        선호하는 컬러를 알려주세요.
        <br /> 여러 개 선택하는 것도 가능해요.
      </InfoHeader>

      {!isLoading &&
        data &&
        data.colors &&
        colorBtnProps.map((options) => (
          <InfoBtnBox
            {...options}
            key={options.label}
            datas={data.colors}
            compareData={state[options.type]}
            handleFunc={handleClick}
          />
        ))}

      <ButtonFooter onClick={handleSubmit}>입력완료</ButtonFooter>
    </>
  );
};

ColorInfo.getLayout = function getLayout(page: ReactElement) {
  return <Layout decreaseHeight={80}>{page}</Layout>;
};

export default ColorInfo;
