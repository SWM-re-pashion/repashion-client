import { ReactElement } from 'react';

import Layout from '@templates/Layout';
import ProfileTemplate from '@templates/ProfileTemplate';
import { useMyInfo } from 'src/hooks/api/profile';

function MyPage({ status }: { status: string }) {
  const { data } = useMyInfo();
  const profile = data?.data;

  if (!profile) return null;
  return (
    <ProfileTemplate
      {...{ status, isMe: true, isNeedFooter: true }}
      totalCount={profile?.totalCount}
    />
  );
}

MyPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default MyPage;
