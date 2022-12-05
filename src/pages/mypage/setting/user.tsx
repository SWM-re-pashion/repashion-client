import React, { ReactElement } from 'react';

import Loading from '@atoms/Loading';
import ErrorFallback from '@organisms/ErrorFallback';
import AsyncBoundary from '@templates/AsyncBoundary';
import Layout from '@templates/Layout';
import InfoModifyTemplate from 'src/components/MyPage/template/InfoModifyTemplate';

function UserPage() {
  // TODO: 닉네임 중복체크
  return (
    <AsyncBoundary
      suspenseFallback={
        <Loading style={{ height: 'calc(var(--vh, 1vh) * 100)' }} />
      }
      errorFallback={ErrorFallback}
    >
      <InfoModifyTemplate />
    </AsyncBoundary>
  );
}

UserPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default UserPage;
