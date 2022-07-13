/* eslint-disable react/function-component-definition */
import { ReactElement, useCallback, useReducer } from 'react';

import ButtonFooter from 'components/shared/atoms/ButtonFooter';
import InfoHeader from 'components/shared/molecules/InfoHeader';
import InfoPageNum from 'components/shared/molecules/InfoPageNum';
import InfoBtnBox from 'components/shared/organisms/InfoBtnBox';
import Layout from 'components/shared/templates/Layout';
import { colorBtnProps } from 'config';
import { NextPageWithLayout } from 'pages/_app';
import { colorInfoReducer, initialState } from 'reducer/colorInfoReducer';

import $ from './style.module.scss';

export const ColorInfo: NextPageWithLayout = () => {
  const [state, dispatch] = useReducer(colorInfoReducer, initialState);

  const handleClick = useCallback(
    (type: string, value: string) => dispatch({ type, payload: value }),
    [dispatch],
  );

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
          compareData={state[options.prop]}
          handleFunc={handleClick}
          isColor
        />
      ))}

      <ButtonFooter>다음</ButtonFooter>
    </>
  );
};

ColorInfo.getLayout = function getLayout(page: ReactElement) {
  return <Layout decreaseHeight={80}>{page}</Layout>;
};

export default ColorInfo;
