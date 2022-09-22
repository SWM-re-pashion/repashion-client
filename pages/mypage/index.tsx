import { GetServerSidePropsContext } from 'next';

import { ReactElement } from 'react';

import Layout from '@templates/Layout';
import ProfileTemplate from '@templates/ProfileTemplate';

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const { status } = query;
  const statusQuery = (typeof status !== 'object' && status) || null;

  return {
    props: {
      status: statusQuery,
    },
  };
}

function MyPage({ status }: { status: string | null }) {
  return (
    <ProfileTemplate
      {...{ status, isMe: true, isNeedFooter: true }}
      profile={{
        profileImg:
          'https://user-images.githubusercontent.com/62797441/187207056-de246ecf-c46a-4a41-b7e6-8e3d760aae99.svg',
        nickname: 'bruney',
      }}
    />
  );
}

MyPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default MyPage;
