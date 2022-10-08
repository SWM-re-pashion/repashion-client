import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { isInstanceOfAPIError } from './error';

export const withGetServerSideProps =
  (getServerSideProps: GetServerSideProps): GetServerSideProps =>
  async (context: GetServerSidePropsContext) => {
    try {
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
