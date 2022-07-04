/* eslint-disable react/function-component-definition */
import { ReactElement } from 'react';

import KakaoLoginBtn from 'components/Login/atoms/KakaoLoginBtn';
import Layout from 'components/shared/templates/Layout';

import { NextPageWithLayout } from './_app';

const Login: NextPageWithLayout = () => {
  return (
    <main>
      <KakaoLoginBtn />
    </main>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Login;
