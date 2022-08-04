import { ReactElement, useEffect, useState } from 'react';

import BackBtn from '@atoms/BackBtn';
import PageHeader from '@molecules/PageHeader';
import Layout from '@templates/Layout';
import ImgUpload from 'components/Upload/organisms/ImgUpload';
import StyleSelect from 'components/Upload/organisms/StyleSelect';

import { styleData } from './constants';
import $ from './style.module.scss';

function Uplaod() {
  return (
    <>
      <PageHeader
        title="상품등록"
        left={<BackBtn color="#000" className={$.back} />}
      />
      <div className={$.upload}>
        <ImgUpload />
        <StyleSelect data={styleData} />
      </div>
    </>
  );
}

Uplaod.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default Uplaod;
