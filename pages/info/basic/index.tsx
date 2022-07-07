/* eslint-disable react/function-component-definition */
import { ReactElement } from 'react';

import ButtonFooter from 'components/shared/atoms/ButtonFooter';
import Label from 'components/shared/atoms/Label';
import ButtonSelect from 'components/shared/molecules/ButtonSelect';
import InputRange from 'components/shared/molecules/InputRange';
import Layout from 'components/shared/templates/Layout';
import { NextPageWithLayout } from 'pages/_app';

import $ from './style.module.scss';

const genders = ['여성', '남성'];
const bodyForms = ['마름', '날씬', '보통', '통통'];
const topSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
const bottomSizes = Array.from({ length: 16 }, (_, i) => 22 + i);

export const BasicInfo: NextPageWithLayout = () => {
  return (
    <>
      <section className={$['basic-info']}>
        <article className={$['info-article']}>
          <Label label="성별" className={$.label} />
          <div className={$['btn-box']}>
            {genders.map((gender) => (
              <ButtonSelect key={gender} label={gender} className={$.btn} />
            ))}
          </div>
        </article>

        <article className={$['info-article']}>
          <Label label="키" className={$.label} />
          <InputRange className={$['height-range']} />
        </article>

        <article className={$['info-article']}>
          <Label label="체형" className={$.label} />
          <div className={$['btn-box']}>
            {bodyForms.map((bodyForm) => (
              <ButtonSelect key={bodyForm} label={bodyForm} className={$.btn} />
            ))}
          </div>
        </article>

        <article className={$['info-article']}>
          <Label label="상의 사이즈" className={$.label} />
          <div className={$['size-btn-box']}>
            {topSizes.map((topSize) => (
              <ButtonSelect
                key={topSize}
                label={topSize}
                className={$['size-btn']}
              />
            ))}
          </div>
        </article>

        <article className={$['info-article']}>
          <Label label="하의 사이즈(인치)" className={$.label} />
          <div className={$['size-btn-box']}>
            {bottomSizes.map((bottomSize) => (
              <ButtonSelect
                key={bottomSize}
                label={bottomSize}
                className={$['size-btn']}
              />
            ))}
          </div>
        </article>
      </section>
      <ButtonFooter>다음</ButtonFooter>
    </>
  );
};

BasicInfo.getLayout = function getLayout(page: ReactElement) {
  return <Layout decreaseHeight={80}>{page}</Layout>;
};

export default BasicInfo;
