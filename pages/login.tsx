/* eslint-disable react/function-component-definition */
import { ReactElement } from 'react';

import Layout from '@templates/Layout';
import KakaoLoginBtn from 'components/Login/atoms/KakaoLoginBtn';

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
