/* eslint-disable react/function-component-definition */
import { ReactElement, useCallback, useReducer } from 'react';

import { colors } from '@constants/index';
import ButtonFooter from 'components/shared/atoms/ButtonFooter';
import InfoHeader from 'components/shared/molecules/InfoHeader';
import InfoPageNum from 'components/shared/molecules/InfoPageNum';
import InfoBtnBox from 'components/shared/organisms/InfoBtnBox';
import Layout from 'components/shared/templates/Layout';
import { NextPageWithLayout } from 'pages/_app';
import { colorInfoReducer, initialState } from 'reducer/colorInfoReducer';
import { ColorUserInfo } from 'types';

import $ from './style.module.scss';

export const ColorInfo: NextPageWithLayout = () => {
  const [state, dispatch] = useReducer(colorInfoReducer, initialState);

  const handleTopColorClick = useCallback(
    (value: string) => dispatch({ type: 'TOP_COLOR', payload: value }),
    [dispatch],
  );
  const handleBottomColorClick = useCallback(
    (value: string) => dispatch({ type: 'BOTTOM_COLOR', payload: value }),
    [dispatch],
  );

  const btnData: [
    string,
    keyof ColorUserInfo,
    (value: string) => void,
    [string, string][],
  ][] = [
    ['상의 컬러', 'topColor', handleTopColorClick, colors],
    ['하의 컬러', 'bottomColor', handleBottomColorClick, colors],
  ];

  return (
    <>
      <section className={$['color-info']}>
        <InfoPageNum>3/3</InfoPageNum>

        <InfoHeader title="color">
          선호하는 컬러를 알려주세요.
          <br /> 여러 개 선택하는 것도 가능해요.
        </InfoHeader>

        {btnData.map((options) => (
          <InfoBtnBox
            key={options[0]}
            label={options[0]}
            datas={options[3]}
            compareData={state[options[1]]}
            handleFunc={options[2]}
            isColor
          />
        ))}
      </section>
      <ButtonFooter>다음</ButtonFooter>
    </>
  );
};

ColorInfo.getLayout = function getLayout(page: ReactElement) {
  return <Layout decreaseHeight={80}>{page}</Layout>;
};

export default ColorInfo;
