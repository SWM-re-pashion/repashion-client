/* eslint-disable react/function-component-definition */
import { useRouter } from 'next/router';

import {
  ReactElement,
  useCallback,
  useState,
  ChangeEvent,
  useRef,
} from 'react';

import ButtonFooter from '@atoms/ButtonFooter';
import Label from '@atoms/Label';
import TextInput from '@atoms/TextInput';
import InfoArticle from '@molecules/InfoArticle';
import InfoHeader from '@molecules/InfoHeader';
import InfoPageNum from '@molecules/InfoPageNum';
import InfoBtnBox from '@organisms/InfoBtnBox';
import Layout from '@templates/Layout';
import { basicBtnProps } from 'config';
import { NextPageWithLayout } from 'pages/_app';
import { useInfoStore } from 'store/useInfoStore';

import $ from './style.module.scss';

export const BasicInfo: NextPageWithLayout = () => {
  const state = useInfoStore((stat) => stat);
  const [errorMsg, setErrorMsg] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const updateInfo = useInfoStore(useCallback((stat) => stat.infoUpdate, []));
  const router = useRouter();

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
      inputRef.current.focus();
    } else {
      if (inputRef.current && updateInfo)
        updateInfo('height', inputRef.current.value);
      setErrorMsg('');
      router.push('/info/color');
    }
  };

  const handleHeightChange = useCallback(heightChangeCallback, []);
  const handleSubmit = useCallback(submitCallback, [
    state.gender,
    state.bodyShape,
    updateInfo,
    router,
  ]);

  return (
    <>
      <InfoPageNum>2/3</InfoPageNum>
      <InfoHeader title="basic">
        성별, 키, 체형 및 사이즈를 알려주세요.
        <br /> 사이즈는 복수 선택도 가능해요.
      </InfoHeader>

      <InfoBtnBox
        {...basicBtnProps[0]}
        compareData={state[basicBtnProps[0].type]}
        handleFunc={updateInfo}
      />

      <InfoArticle label="키" required>
        <div className={$['height-input']}>
          <TextInput
            controlled={false}
            placeholder="130 ~ 200 범위의 키를 입력해주세요."
            handleChange={handleHeightChange}
            value={state.height}
            ref={inputRef}
          />
          <Label className={$['height-cm']}>cm</Label>
        </div>
      </InfoArticle>

      {basicBtnProps.slice(1).map((options) => (
        <InfoBtnBox
          {...options}
          key={options.label}
          compareData={state[options.type]}
          handleFunc={updateInfo}
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
