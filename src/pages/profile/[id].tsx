import { useRouter } from 'next/router';

import { ReactElement } from 'react';

import Layout from '@templates/Layout';
import ProfileTemplate from '@templates/ProfileTemplate';

function Profile() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <ProfileTemplate
      {...{ id: id as string, isMe: false, isNeedFooter: false }}
    />
  );
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default Profile;
