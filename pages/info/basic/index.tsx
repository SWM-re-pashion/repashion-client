/* eslint-disable react/function-component-definition */
import { ReactElement, useCallback, useState } from 'react';

import { genders, bodyForms, topSizes, bottomSizes } from '@constants/index';
import ButtonFooter from 'components/shared/atoms/ButtonFooter';
import InfoArticle from 'components/shared/molecules/InfoArticle';
import InfoHeader from 'components/shared/molecules/InfoHeader';
import InfoPageNum from 'components/shared/molecules/InfoPageNum';
import InputRange from 'components/shared/molecules/InputRange';
import InfoBtnBox from 'components/shared/organisms/InfoBtnBox';
import Layout from 'components/shared/templates/Layout';
import { NextPageWithLayout } from 'pages/_app';

import $ from './style.module.scss';

export const BasicInfo: NextPageWithLayout = () => {
  const [gender, setGender] = useState('');
  const [bodyForm, setBodyForm] = useState('');
  const [topSize, setTopSize] = useState<string[]>([]);
  const [bottomSize, setBottomSize] = useState<string[]>([]);

  const handleGenderClick = (gen: string) => setGender(gen);
  const handleBodyFormClick = (body: string) => setBodyForm(body);
  const handleTopSizeClick = useCallback(
    (size: string) => {
      if (topSize.find((x) => x === size) === undefined) {
        setTopSize([...topSize, size]);
      } else {
        setTopSize(topSize.filter((x) => x !== size));
      }
    },
    [topSize],
  );
  // useCallback 공부, dynamic import 공부
  const handleBottomSizeClick = useCallback(
    (size: string) => {
      if (bottomSize.find((x) => x === size) === undefined) {
        setBottomSize([...bottomSize, size]);
      } else {
        setBottomSize(bottomSize.filter((x) => x !== size));
      }
    },
    [bottomSize],
  );

  const btnData: [
    string,
    string | string[],
    (value: string) => void,
    string[],
  ][] = [
    ['체형 *', bodyForm, handleBodyFormClick, bodyForms],
    ['상의 사이즈', topSize, handleTopSizeClick, topSizes],
    ['상의 사이즈', bottomSize, handleBottomSizeClick, bottomSizes],
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
          compareData={gender}
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
            compareData={bottomSize}
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
