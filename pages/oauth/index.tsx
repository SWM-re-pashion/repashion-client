import { useRouter } from 'next/router';

import { ReactElement, useEffect } from 'react';

import Loading from '@atoms/Loading';
import Layout from 'components/shared/templates/Layout';
import { usePostAuthToken } from 'hooks/api/login';

import $ from './style.module.scss';

function Oauth() {
  const { query } = useRouter();
  const { mutate } = usePostAuthToken();

  useEffect(() => {
    if (query.code && typeof query.code === 'string') {
      mutate(query.code);
    }
  }, [mutate, query]);

  return (
    <div className={$['oauth-loading']}>
      <Loading />
    </div>
  );
}

Oauth.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Oauth;
