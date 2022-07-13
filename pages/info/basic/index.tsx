/* eslint-disable react/function-component-definition */
import {
  ReactElement,
  useReducer,
  useCallback,
  useState,
  ChangeEvent,
  useRef,
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
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(
    (type: string, value: string) => dispatch({ type, payload: value }),
    [dispatch],
  );
  const handleHeightChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    e.target.value = value.replace(/[^0-9]/g, '');
    if (value.length > 3) e.target.value = value.substring(0, 3);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!state.gender || !state.bodyForm) {
      setErrorMsg('필수 항목을 입력해주세요.');
      return;
    }
    if (
      inputRef.current &&
      (+inputRef.current.value < 130 ||
        +inputRef.current.value > 200 ||
        !inputRef.current.value)
    ) {
      setErrorMsg('130 ~ 200 범위의 키를 입력해주세요.');
      return;
    }
    setErrorMsg('');
  }, [state.gender, state.bodyForm]);

  const btnData: [string, keyof BasicUserInfo, string, string[]][] = [
    ['체형', 'bodyForm', 'BODY_FORM', bodyForms],
    ['상의 사이즈', 'topSize', 'TOP_SIZE', topSizes],
    ['하의 사이즈(인치)', 'bottomSize', 'BOTTOM_SIZE', bottomSizes],
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
          type="GENDER"
          datas={genders}
          compareData={state.gender}
          handleFunc={handleClick}
          required
        />

        <InfoArticle label="키" required>
          <div className={$['height-input']}>
            <TextInput
              placeholder="130 ~ 200 범위의 키를 입력해주세요."
              handleChange={handleHeightChange}
              ref={inputRef}
            />
            <Label className={$['height-cm']}>CM</Label>
          </div>
        </InfoArticle>

        {btnData.map((options) => (
          <InfoBtnBox
            key={options[0]}
            label={options[0]}
            type={options[2]}
            datas={options[3]}
            compareData={state[options[1]]}
            handleFunc={handleClick}
            required={options[0] === '체형'}
          />
        ))}
      </section>
      <ButtonFooter onClick={handleSubmit} msg={errorMsg}>
        다음
      </ButtonFooter>
    </>
  );
};

BasicInfo.getLayout = function getLayout(page: ReactElement) {
  return <Layout decreaseHeight={80}>{page}</Layout>;
};

export default BasicInfo;
