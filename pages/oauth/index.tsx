import Spinner from 'components/shared/atoms/Spinner';
import Layout from 'components/shared/templates/Layout';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'pages/_app';
import { ReactElement } from 'react';
import $ from './style.module.scss';

const Oauth: NextPageWithLayout = () => {
  const { query } = useRouter();

  return (
    <div className={$['oauth-loading']}>
      <Spinner width={50} borderWidth={3} color={'#876bf6'} />
      <span>{query.code}</span>
    </div>
  );
};

Oauth.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Oauth;
