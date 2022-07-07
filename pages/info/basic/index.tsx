/* eslint-disable react/function-component-definition */
import { ReactElement } from 'react';

import ButtonFooter from 'components/shared/atoms/ButtonFooter';
import ButtonSelect from 'components/shared/molecules/ButtonSelect';
import InputRange from 'components/shared/molecules/InputRange';
import Layout from 'components/shared/templates/Layout';
import { NextPageWithLayout } from 'pages/_app';

import $ from './style.module.scss';

export const BasicInfo: NextPageWithLayout = () => {
  return (
    <>
      <section className={$['basic-info']}>
        <div className={$['gender-btn-box']}>
          <ButtonSelect label="여성" className={$['gender-btn']} />
          <ButtonSelect label="남성" className={$['gender-btn']} />
        </div>
        <InputRange />
      </section>
      <ButtonFooter>다음</ButtonFooter>
    </>
  );
};

BasicInfo.getLayout = function getLayout(page: ReactElement) {
  return <Layout decreaseHeight={80}>{page}</Layout>;
};

export default BasicInfo;
