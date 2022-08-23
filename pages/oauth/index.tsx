/* eslint-disable react/function-component-definition */
import { useRouter } from 'next/router';

import { ReactElement, useEffect } from 'react';

import LoadingSpinner from '@atoms/LoadingSpinner';
import { usePostAuthToken } from 'api/login';
import Layout from 'components/shared/templates/Layout';
import { NextPageWithLayout } from 'pages/_app';

import $ from './style.module.scss';

const Oauth: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { mutate } = usePostAuthToken();

  useEffect(() => {
    if (query.code && typeof query.code === 'string') {
      mutate(query.code);
    }
  }, [mutate, query]);

  return (
    <div className={$['oauth-loading']}>
      <LoadingSpinner width={50} borderWidth={3} color="#876bf6" />
    </div>
  );
};

Oauth.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Oauth;
