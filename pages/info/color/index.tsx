/* eslint-disable react/function-component-definition */
import { useRouter } from 'next/router';

import { ReactElement, useCallback } from 'react';

import ButtonFooter from 'components/shared/atoms/ButtonFooter';
import InfoHeader from 'components/shared/molecules/InfoHeader';
import InfoPageNum from 'components/shared/molecules/InfoPageNum';
import InfoBtnBox from 'components/shared/organisms/InfoBtnBox';
import Layout from 'components/shared/templates/Layout';
import { colorBtnProps } from 'config';
import { NextPageWithLayout } from 'pages/_app';
import { useInfoStore } from 'store/useInfoStore';

export const ColorInfo: NextPageWithLayout = () => {
  const state = useInfoStore((stat) => stat);
  const handleClick = useInfoStore(useCallback((stat) => stat.infoUpdate, []));
  const router = useRouter();

  const handleSubmit = () => {
    router.push('/info/basic');
  };

  return (
    <>
      <InfoPageNum>3/3</InfoPageNum>

      <InfoHeader title="color">
        선호하는 컬러를 알려주세요.
        <br /> 여러 개 선택하는 것도 가능해요.
      </InfoHeader>

      {colorBtnProps.map((options) => (
        <InfoBtnBox
          key={options.label}
          {...options}
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
