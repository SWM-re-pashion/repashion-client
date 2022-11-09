import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { ACCESSTOKEN } from '@constants/api';
import { getSSRAccessToken } from 'src/utils/auth';

import { isInstanceOfAPIError } from './error';

import { Axios } from '.';

export const withGetServerSideProps =
  (getServerSideProps: GetServerSideProps): GetServerSideProps =>
  async (context: GetServerSidePropsContext) => {
    try {
      const cookie = context.req?.headers.cookie || '';
      const token = getSSRAccessToken(context);
      Axios.defaults.headers.Cookie = '';
      Axios.defaults.headers[ACCESSTOKEN] = token;
      if (context.req && cookie) {
        Axios.defaults.headers.Cookie = cookie;
      }
      return await getServerSideProps(context);
    } catch (error) {
      if (isInstanceOfAPIError(error)) {
        const { redirectUrl, notFound } = error;
        if (notFound) {
          return {
            notFound: true,
          };
        }

        return {
          redirect: {
            destination: redirectUrl,
            permanent: false,
          },
        };
      }
      throw error;
    }
  };
