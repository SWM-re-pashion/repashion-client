import { ReactElement } from 'react';

import Layout from '@templates/Layout';
import ProfileTemplate from '@templates/ProfileTemplate';

function MyPage({ status }: { status: string }) {
  return <ProfileTemplate {...{ status, isMe: true, isNeedFooter: true }} />;
}

MyPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default MyPage;
