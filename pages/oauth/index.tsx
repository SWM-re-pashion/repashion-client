/* eslint-disable react/function-component-definition */
import { useRouter } from 'next/router';

import { ReactElement, useEffect } from 'react';

import Spinner from 'components/shared/atoms/Spinner';
import Layout from 'components/shared/templates/Layout';
import usePostAuthToken from 'hooks/usePostAuthToken';
import { NextPageWithLayout } from 'pages/_app';

import $ from './style.module.scss';

const Oauth: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { mutate } = usePostAuthToken();

  useEffect(() => {
    if (query.code && typeof query.code === 'string') mutate(query.code);
  }, [query]);

  return (
    <div className={$['oauth-loading']}>
      <Spinner width={50} borderWidth={3} color="#876bf6" />
      <span>{query.code}</span>
    </div>
  );
};

Oauth.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Oauth;
