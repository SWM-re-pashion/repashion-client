import { NextPageContext } from 'next';

import { ERROR_IMAGE } from '@constants/img';
import * as Sentry from '@sentry/nextjs';
import NotFound from '@templates/NotFound';

function CustomErrorComponent() {
  const props = {
    title: '500 server error',
    img: ERROR_IMAGE,
    alt: '500 server error',
  };
  return <NotFound {...props} />;
}

CustomErrorComponent.getInitialProps = async (contextData: NextPageContext) => {
  await Sentry.captureUnderscoreErrorException(contextData);
};

export default CustomErrorComponent;
