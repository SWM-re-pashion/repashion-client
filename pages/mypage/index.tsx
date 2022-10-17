import { GetServerSidePropsContext } from 'next';

import { ReactElement } from 'react';

import { queryKey } from '@constants/react-query';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Layout from '@templates/Layout';
import ProfileTemplate from '@templates/ProfileTemplate';
import { getMyInfo } from 'api/profile';
import { useMyInfo } from 'hooks/api/profile';

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const { status } = query;
  const statusQuery = (typeof status !== 'object' && status) || '';

  const queryClient = new QueryClient();
  await queryClient.fetchQuery(queryKey.myInfo, () => getMyInfo());

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      status: statusQuery,
    },
  };
}

function MyPage({ status }: { status: string }) {
  const { data } = useMyInfo();
  const profile = data?.data;

  if (!profile) return null;
  return (
    <ProfileTemplate
      {...{ status, isMe: true, isNeedFooter: true }}
      profile={{
        profileImg: profile?.profileImage,
        nickname: profile?.name,
      }}
      totalCount={profile?.totalCount}
    />
  );
}

MyPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default MyPage;
