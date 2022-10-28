import React, { ReactElement } from 'react';

import { ISR_5MIN } from '@constants/api';
import { queryKey } from '@constants/react-query';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Layout from '@templates/Layout';
import { withGetServerSideProps } from 'src/api/core/withGetServerSideProps';
import { getMyInfo } from 'src/api/profile';
import InfoModifyTemplate from 'src/components/MyPage/template/InfoModifyTemplate';
import { useMyInfo } from 'src/hooks/api/profile';

export const getStaticProps = withGetServerSideProps(async () => {
  const queryClient = new QueryClient();
  await queryClient.fetchQuery(queryKey.myInfo, () => getMyInfo());

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: ISR_5MIN,
  };
});

function UserPage() {
  // TODO: 닉네임 중복체크
  const { data } = useMyInfo();
  const userData = data?.data;
  if (!userData) return null;
  const { name, profileImage, email } = userData;

  return <InfoModifyTemplate {...{ name, profileImage, email }} />;
}

UserPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default UserPage;
