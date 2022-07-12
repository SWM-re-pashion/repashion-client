/* eslint-disable react/function-component-definition */
import { ReactElement, useReducer, useCallback } from 'react';

import { genders, bodyForms, topSizes, bottomSizes } from '@constants/index';
import ButtonFooter from 'components/shared/atoms/ButtonFooter';
import InfoArticle from 'components/shared/molecules/InfoArticle';
import InfoHeader from 'components/shared/molecules/InfoHeader';
import InfoPageNum from 'components/shared/molecules/InfoPageNum';
import InputRange from 'components/shared/molecules/InputRange';
import InfoBtnBox from 'components/shared/organisms/InfoBtnBox';
import Layout from 'components/shared/templates/Layout';
import { NextPageWithLayout } from 'pages/_app';
import { initialState, basicInfoReducer } from 'reducer/basicInfoReducer';
import { BasicUserInfo } from 'types';

import $ from './style.module.scss';

export const BasicInfo: NextPageWithLayout = () => {
  const [state, dispatch] = useReducer(basicInfoReducer, initialState);

  const handleGenderClick = useCallback(
    (value: string) => dispatch({ type: 'GENDER', payload: value }),
    [dispatch],
  );
  const handleBodyFormClick = useCallback(
    (value: string) => dispatch({ type: 'BODY_FORM', payload: value }),
    [dispatch],
  );
  const handleTopSizeClick = useCallback(
    (value: string) => dispatch({ type: 'TOP_SIZE', payload: value }),
    [dispatch],
  );
  const handleBottomSizeClick = useCallback(
    (value: string) => dispatch({ type: 'BOTTOM_SIZE', payload: value }),
    [dispatch],
  );

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
        <InfoPageNum>1/3</InfoPageNum>
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
            key={options[0]}
            label={options[0]}
            datas={options[3]}
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
