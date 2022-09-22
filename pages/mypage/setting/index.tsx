import { ReactElement } from 'react';

import BackBtn from '@atoms/BackBtn';
import { seoData } from '@constants/seo';
import Layout from '@templates/Layout';
import PageTemplate from '@templates/PageTemplate';

import $ from './style.module.scss';

function Setting() {
  return (
    <PageTemplate
      metaTitle="re:Fashion | 마이 페이지 | 설정"
      metaUrl={`${seoData.url}/mypage/setting`}
      title="설정"
      left={<BackBtn color="#000" />}
      isNeedFooter={false}
    >
      
    </PageTemplate>
  );
}

Setting.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default Setting;
