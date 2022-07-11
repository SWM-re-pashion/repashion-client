/* eslint-disable react/function-component-definition */
import { ReactElement, useReducer } from 'react';

import { genders, bodyForms, topSizes, bottomSizes } from '@constants/index';
import ButtonFooter from 'components/shared/atoms/ButtonFooter';
import InfoArticle from 'components/shared/molecules/InfoArticle';
import InfoHeader from 'components/shared/molecules/InfoHeader';
import InfoPageNum from 'components/shared/molecules/InfoPageNum';
import InputRange from 'components/shared/molecules/InputRange';
import InfoBtnBox from 'components/shared/organisms/InfoBtnBox';
import Layout from 'components/shared/templates/Layout';
import { NextPageWithLayout } from 'pages/_app';
import { basicInfo } from 'reducer';
import { BasicUserInfo } from 'types';

import $ from './style.module.scss';

export const BasicInfo: NextPageWithLayout = () => {
  const { initialState, basicInfoReducer } = basicInfo;
  const [state, dispatch] = useReducer(basicInfoReducer, initialState);

  const handleGenderClick = (value: string) =>
    dispatch({ type: 'GENDER', payload: value });
  const handleBodyFormClick = (value: string) =>
    dispatch({ type: 'BODY_FORM', payload: value });
  const handleTopSizeClick = (value: string) =>
    dispatch({ type: 'TOP_SIZE', payload: value });
  const handleBottomSizeClick = (value: string) =>
    dispatch({ type: 'BOTTOM_SIZE', payload: value });

  // useCallback 공부, dynamic import 공부

  const btnData: [
    string,
    keyof BasicUserInfo,
    (value: string) => void,
    string[],
  ][] = [
    ['체형 *', 'bodyForm', handleBodyFormClick, bodyForms],
    ['상의 사이즈', 'topSize', handleTopSizeClick, topSizes],
    ['하의 사이즈(인치)', 'bottomSize', handleBottomSizeClick, bottomSizes],
  ];

  return (
    <>
      <section className={$['basic-info']}>
        <InfoPageNum>2/3</InfoPageNum>

        <InfoHeader title="basic">
          성별, 키, 체형 및 사이즈를 알려주세요.
          <br /> 사이즈는 복수 선택도 가능해요.
        </InfoHeader>

        <InfoBtnBox
          label="성별 *"
          datas={genders}
          compareData={state.gender}
          handleFunc={handleGenderClick}
        />

        <InfoArticle label="키 *">
          <InputRange className={$['height-range']} />
        </InfoArticle>

        {btnData.map((options) => (
          <InfoBtnBox
            key={options[3][0]}
            label={options[0]}
            datas={options[3].slice(1)}
            compareData={state[options[1]]}
            handleFunc={options[2]}
          />
        ))}
      </section>
      <ButtonFooter>다음</ButtonFooter>
    </>
  );
};

BasicInfo.getLayout = function getLayout(page: ReactElement) {
  return <Layout decreaseHeight={80}>{page}</Layout>;
};

export default BasicInfo;
