/* eslint-disable react/function-component-definition */
import { ReactElement } from 'react';

import { colors } from '@constants/index';
import ButtonFooter from 'components/shared/atoms/ButtonFooter';
import ButtonSelect from 'components/shared/molecules/ButtonSelect';
import InfoArticle from 'components/shared/molecules/InfoArticle';
import InfoHeader from 'components/shared/molecules/InfoHeader';
import InfoPageNum from 'components/shared/molecules/InfoPageNum';
import Layout from 'components/shared/templates/Layout';
import { NextPageWithLayout } from 'pages/_app';

import $ from './style.module.scss';

const clothsColor = [[...colors], [...colors]];

export const ColorInfo: NextPageWithLayout = () => {
  return (
    <>
      <section className={$['color-info']}>
        <InfoPageNum>3/3</InfoPageNum>

        <InfoHeader title="color">
          선호하는 컬러를 알려주세요.
          <br /> 여러 개 선택하는 것도 가능해요.
        </InfoHeader>

        {clothsColor.map((clothColor, idx) => (
          <InfoArticle
            key={idx ? '하의 컬러' : '상의 컬러'}
            label={idx ? '하의 컬러' : '상의 컬러'}
          >
            <div className={$['btn-box']}>
              {clothColor.map(([text, color]) => (
                <ButtonSelect key={text} className={$.btn} color={color}>
                  {text}
                </ButtonSelect>
              ))}
            </div>
          </InfoArticle>
        ))}
      </section>
      <ButtonFooter>다음</ButtonFooter>
    </>
  );
};

ColorInfo.getLayout = function getLayout(page: ReactElement) {
  return <Layout decreaseHeight={80}>{page}</Layout>;
};

export default ColorInfo;
