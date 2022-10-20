import { useRouter } from 'next/router';

import { ReactElement, useEffect } from 'react';

import Loading from '@atoms/Loading';
import Layout from 'components/shared/templates/Layout';
import { usePostAuthToken } from 'hooks/api/login';
import { getPropFromQuery } from 'utils';

import $ from './style.module.scss';

function Oauth() {
  const { asPath } = useRouter();
  const { mutate } = usePostAuthToken();
  const query = asPath.split('#')[1];
  const token = getPropFromQuery(query, 'access_token');

  useEffect(() => {
    if (token && typeof token === 'string') {
      mutate(token);
    }
  }, [mutate, token]);

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
