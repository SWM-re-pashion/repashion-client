import { useRouter } from 'next/router';

import { ReactElement } from 'react';

import BackBtn from '@atoms/BackBtn';
import { SelectArrow } from '@atoms/icon';
import Span from '@atoms/Span';
import { seoData } from '@constants/seo';
import Layout from '@templates/Layout';
import PageTemplate from '@templates/PageTemplate';
import SettingMenu from 'src/components/MyPage/molecules/SettingMenu';
import { logout } from 'src/utils/auth';
import { toastSuccess } from 'src/utils/toaster';

function Setting() {
  const router = useRouter();
  const settingData = [
    {
      text: '계정 설정',
      icon: <SelectArrow style={{ transform: 'rotate(270deg)' }} />,
      onClick: () => router.push('/mypage/setting/user'),
    },
    {
      text: '개인 맞춤정보 관리',
      icon: <SelectArrow style={{ transform: 'rotate(270deg)' }} />,
      onClick: () => router.push('/info/basic'),
    },
    {
      text: '개인정보 처리방침',
      icon: <SelectArrow style={{ transform: 'rotate(270deg)' }} />,
      onClick: () => toastSuccess({ message: '준비중입니다.' }),
    },
    {
      text: '서비스 이용약관',
      icon: <SelectArrow style={{ transform: 'rotate(270deg)' }} />,
      onClick: () => toastSuccess({ message: '준비중입니다.' }),
    },
    {
      text: '앱 버전',
      icon: <Span color="#936dff">v0.9.7</Span>,
    },
    {
      text: '로그아웃',
      onClick: () => {
        logout();
        router.push('/shop');
      },
    },
    {
      text: '회원탈퇴',
      icon: <SelectArrow style={{ transform: 'rotate(270deg)' }} />,
      onClick: () => toastSuccess({ message: '준비중입니다.' }),
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
