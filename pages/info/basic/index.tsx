/* eslint-disable react/function-component-definition */
import { ReactElement } from 'react';

import ButtonFooter from 'components/shared/atoms/ButtonFooter';
import ButtonSelect from 'components/shared/molecules/ButtonSelect';
import InfoArticle from 'components/shared/molecules/InfoArticle';
import InfoHeader from 'components/shared/molecules/InfoHeader';
import InfoPageNum from 'components/shared/molecules/InfoPageNum';
import InputRange from 'components/shared/molecules/InputRange';
import Layout from 'components/shared/templates/Layout';
import { NextPageWithLayout } from 'pages/_app';

import $ from './style.module.scss';

const genders = ['여성', '남성'];
const bodyForms = ['체형', '마름', '날씬', '보통', '통통'];
const topSizes = ['상의 사이즈', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
const bottomSizes = [
  '하의 사이즈(인치)',
  ...Array.from({ length: 16 }, (_, i) => 22 + i),
];

export const BasicInfo: NextPageWithLayout = () => {
  return (
    <>
      <section className={$['basic-info']}>
        <InfoPageNum>2/3</InfoPageNum>

        <InfoHeader title="basic">
          성별, 키, 체형 및 사이즈를 알려주세요.
          <br /> 사이즈는 복수 선택도 가능해요.
        </InfoHeader>

        <InfoArticle label="성별">
          <div className={$['btn-box']}>
            {genders.map((gender) => (
              <ButtonSelect key={gender} label={gender} className={$.btn} />
            ))}
          </div>
        </InfoArticle>

        <InfoArticle label="키">
          <InputRange className={$['height-range']} />
        </InfoArticle>

        {[bodyForms, topSizes, bottomSizes].map((options) => (
          <InfoArticle key={options[0]} label={options[0]}>
            <div className={$['btn-box']}>
              {options.slice(1).map((option) => (
                <ButtonSelect key={option} label={option} className={$.btn} />
              ))}
            </div>
          </InfoArticle>
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
