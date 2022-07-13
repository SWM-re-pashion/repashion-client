/* eslint-disable react/function-component-definition */
import {
  ReactElement,
  useReducer,
  useCallback,
  useState,
  ChangeEvent,
  useRef,
} from 'react';

import ButtonFooter from 'components/shared/atoms/ButtonFooter';
import Label from 'components/shared/atoms/Label';
import TextInput from 'components/shared/atoms/TextInput';
import InfoArticle from 'components/shared/molecules/InfoArticle';
import InfoHeader from 'components/shared/molecules/InfoHeader';
import InfoPageNum from 'components/shared/molecules/InfoPageNum';
import InfoBtnBox from 'components/shared/organisms/InfoBtnBox';
import Layout from 'components/shared/templates/Layout';
import { basicBtnProps } from 'config';
import { NextPageWithLayout } from 'pages/_app';
import { initialState, basicInfoReducer } from 'reducer/basicInfoReducer';

import $ from './style.module.scss';

export const BasicInfo: NextPageWithLayout = () => {
  const [state, dispatch] = useReducer(basicInfoReducer, initialState);
  const [errorMsg, setErrorMsg] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(
    (type: string, value: string) => dispatch({ type, payload: value }),
    [dispatch],
  );

  const heightChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    e.target.value = value.replace(/[^0-9]/g, '');
    if (value.length > 3) e.target.value = value.substring(0, 3);
  };

  const verifyHeight = (value: string) => {
    return +value < 130 || +value > 200 || !value;
  };

  const submitCallback = () => {
    if (!state.gender || !state.bodyShape) {
      setErrorMsg('필수 항목을 입력해주세요.');
    } else if (inputRef.current && verifyHeight(inputRef.current.value)) {
      setErrorMsg('130 ~ 200 범위의 키를 입력해주세요.');
    } else {
      setErrorMsg('');
    }
  };

  const handleHeightChange = useCallback(heightChangeCallback, []);
  const handleSubmit = useCallback(submitCallback, [
    state.gender,
    state.bodyShape,
  ]);

  return (
    <>
      <InfoPageNum>1/3</InfoPageNum>
      <InfoHeader title="basic">
        성별, 키, 체형 및 사이즈를 알려주세요.
        <br /> 사이즈는 복수 선택도 가능해요.
      </InfoHeader>

      <InfoBtnBox
        {...basicBtnProps[0]}
        compareData={state[basicBtnProps[0].prop]}
        handleFunc={handleClick}
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

      {basicBtnProps.slice(1).map((options) => (
        <InfoBtnBox
          {...options}
          key={options.label}
          compareData={state[options.prop]}
          handleFunc={handleClick}
        />
      ))}

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
