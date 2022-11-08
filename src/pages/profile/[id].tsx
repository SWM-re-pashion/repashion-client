import { GetServerSidePropsContext } from 'next';

import { ReactElement } from 'react';

import { queryKey } from '@constants/react-query';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Layout from '@templates/Layout';
import ProfileTemplate from '@templates/ProfileTemplate';
import { withGetServerSideProps } from 'src/api/core/withGetServerSideProps';
import { getUserInfo } from 'src/api/profile';

export const getServerSideProps = withGetServerSideProps(
  async ({ params }: GetServerSidePropsContext) => {
    const paramId = params?.id as string;

    const queryClient = new QueryClient();
    await queryClient.fetchQuery(queryKey.userInfo(paramId), () =>
      getUserInfo(paramId),
    );

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        id: paramId,
      },
    };
  },
);

function Profile({ id }: { id: string }) {
  return <ProfileTemplate {...{ id, isMe: false, isNeedFooter: false }} />;
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default Profile;
