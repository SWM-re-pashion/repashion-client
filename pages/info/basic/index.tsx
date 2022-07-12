/* eslint-disable react/function-component-definition */
import {
  ReactElement,
  useReducer,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { genders, bodyForms, topSizes, bottomSizes } from '@constants/index';
import ButtonFooter from 'components/shared/atoms/ButtonFooter';
import Label from 'components/shared/atoms/Label';
import TextInput from 'components/shared/atoms/TextInput';
import InfoArticle from 'components/shared/molecules/InfoArticle';
import InfoHeader from 'components/shared/molecules/InfoHeader';
import InfoPageNum from 'components/shared/molecules/InfoPageNum';
import InfoBtnBox from 'components/shared/organisms/InfoBtnBox';
import Layout from 'components/shared/templates/Layout';
import { NextPageWithLayout } from 'pages/_app';
import { initialState, basicInfoReducer } from 'reducer/basicInfoReducer';
import { BasicUserInfo } from 'types';

import $ from './style.module.scss';

export const BasicInfo: NextPageWithLayout = () => {
  const [state, dispatch] = useReducer(basicInfoReducer, initialState);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!state.gender || !state.bodyForm) {
      setErrorMsg('필수 항목을 입력해주세요.');
    }
  }, [state.gender, state.bodyForm]);

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

  const handleSubmit = () => {
    console.log(1);
  };

  // validation flow
  // 평상시 dimmed
  // 그러면 계속 사용자가 입력하는 값을 탐지
  // 유저가 모든 값을 올바르게 입력했을 때, 버튼이 검은색으로 바뀜
  // 만약 유저가 140 ~ 200 범위가 아닌 키를 입력했을 때, 오류 메시지를 띄워줌
  // 즉, 유저가 입력할 때마다 렌더링해야 함.

  const btnData: [
    string,
    keyof BasicUserInfo,
    (value: string) => void,
    string[],
  ][] = [
    ['체형', 'bodyForm', handleBodyFormClick, bodyForms],
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
          label="성별"
          datas={genders}
          compareData={state.gender}
          handleFunc={handleGenderClick}
          required
        />

        <InfoArticle label="키" required>
          <div className={$['height-input']}>
            <TextInput placeholder="130 ~ 200 범위의 키를 입력해주세요." />
            <Label className={$['height-cm']}>CM</Label>
          </div>
        </InfoArticle>

        {btnData.map((options) => (
          <InfoBtnBox
            key={options[0]}
            label={options[0]}
            datas={options[3]}
            compareData={state[options[1]]}
            handleFunc={options[2]}
            required={options[0] === '체형'}
          />
        ))}
      </section>
      <ButtonFooter onClick={handleSubmit}>다음</ButtonFooter>
    </>
  );
};

BasicInfo.getLayout = function getLayout(page: ReactElement) {
  return <Layout decreaseHeight={80}>{page}</Layout>;
};

export default BasicInfo;
