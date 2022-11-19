import { NextPageContext } from 'next';

import * as Sentry from '@sentry/nextjs';
import NotFound from '@templates/NotFound';

function CustomErrorComponent() {
  const props = {
    title: '500 server error',
    img: 'https://user-images.githubusercontent.com/62797441/202860611-d4b97a7b-7f38-4ce7-a3b2-9af800877250.png',
    alt: '500 server error',
  };
  return <NotFound {...props} />;
}

CustomErrorComponent.getInitialProps = async (contextData: NextPageContext) => {
  await Sentry.captureUnderscoreErrorException(contextData);
};

export default CustomErrorComponent;
