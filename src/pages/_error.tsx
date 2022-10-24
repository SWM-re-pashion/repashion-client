import { NextPageContext } from 'next';
import NextErrorComponent, { ErrorProps } from 'next/error';

import * as Sentry from '@sentry/nextjs';

function CustomErrorComponent(props: ErrorProps) {
  const { statusCode } = props;
  return <NextErrorComponent statusCode={statusCode} />;
}

CustomErrorComponent.getInitialProps = async (contextData: NextPageContext) => {
  await Sentry.captureUnderscoreErrorException(contextData);
  return NextErrorComponent.getInitialProps(contextData);
};

export default CustomErrorComponent;
