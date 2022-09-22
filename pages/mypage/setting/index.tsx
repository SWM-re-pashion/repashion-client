import { ReactElement } from 'react';

import BackBtn from '@atoms/BackBtn';
import { SelectArrow } from '@atoms/icon';
import Span from '@atoms/Span';
import { seoData } from '@constants/seo';
import Layout from '@templates/Layout';
import PageTemplate from '@templates/PageTemplate';
import SettingMenu from 'components/MyPage/molecules/SettingMenu';
import { useParamRouter } from 'hooks';

function Setting() {
  const paramRouter = useParamRouter();
  const settingData = [
    {
      text: '계정 설정',
      icon: <SelectArrow style={{ transform: 'rotate(270deg)' }} />,
    },
    {
      text: '개인 맞춤정보 관리',
      icon: <SelectArrow style={{ transform: 'rotate(270deg)' }} />,
      onClick: () => paramRouter('/info/style'),
    },
    {
      text: '오픈소스 라이브러리',
      icon: <SelectArrow style={{ transform: 'rotate(270deg)' }} />,
    },
    {
      text: '서비스 이용약관',
      icon: <SelectArrow style={{ transform: 'rotate(270deg)' }} />,
    },
    {
      text: '앱 버전',
      icon: <Span color="#936dff">v0.8.1</Span>,
    },
    {
      text: '로그아웃',
    },
    {
      text: '회원탈퇴',
      icon: <SelectArrow style={{ transform: 'rotate(270deg)' }} />,
    },
  ];

  return (
    <PageTemplate
      metaTitle="re:Fashion | 마이 페이지 | 설정"
      metaUrl={`${seoData.url}/mypage/setting`}
      title="설정"
      left={<BackBtn color="#000" />}
      isNeedFooter={false}
    >
      {settingData.map((data) => (
        <SettingMenu key={data.text} {...data} />
      ))}
    </PageTemplate>
  );
}

Setting.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default Setting;
