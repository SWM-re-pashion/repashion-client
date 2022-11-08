import React, { ReactElement } from 'react';

import Loading from '@atoms/Loading';
import Layout from '@templates/Layout';
import InfoModifyTemplate from 'src/components/MyPage/template/InfoModifyTemplate';
import { useMyInfo } from 'src/hooks/api/profile';

function UserPage() {
  // TODO: 닉네임 중복체크
  const { data } = useMyInfo();
  const userData = data?.data;
  if (!userData)
    return <Loading style={{ height: 'calc(var(--vh, 1vh) * 100)' }} />;
  const { name, profileImage, email } = userData;

  return <InfoModifyTemplate {...{ name, profileImage, email }} />;
}

UserPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default UserPage;
