import { NextRouter, withRouter } from 'next/router';

import React, { ReactElement } from 'react';

import { isInstanceOfAPIError } from 'src/api/core/error';
import NotFoundPage from 'src/pages/404';

type ErrorFallbackProps<ErrorType extends Error = Error> = {
  error: ErrorType;
  reset: (...args: unknown[]) => void;
  otherRenderComponent?: JSX.Element;
  includedStatusCodes?: number[];
};

type WithRouterProps = {
  router: NextRouter;
};

type ErrorFallbackType = <ErrorType extends Error>(
  props: ErrorFallbackProps<ErrorType>,
) => JSX.Element;

type Props = {
  errorFallback: ErrorFallbackType;
  children: ReactElement;
  resetQuery?: () => void;
  keys?: unknown[];
  otherRenderComponent?: JSX.Element;
  includedStatusCodes?: number[];
} & WithRouterProps;

type State = {
  hasError: boolean;
  error: Error | null;
};
const initialState = { hasError: false, error: null };

const changedArray = (
  prevArray: Array<unknown> = [],
  nextArray: Array<unknown> = [],
) => {
  return (
    prevArray.length !== nextArray.length ||
    prevArray.some((item, index) => {
      return !Object.is(item, nextArray[index]);
    })
  );
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { error } = this.state;
    const { keys } = this.props;

    if (
      error !== null &&
      prevState.error !== null &&
      changedArray(prevProps.keys, keys)
    ) {
      this.resetBoundary();
    }
  }

  resetBoundary = () => {
    const { resetQuery } = this.props;
    resetQuery?.();
    this.setState(initialState);
  };

  render() {
    const { hasError, error } = this.state;
    const { errorFallback, router } = this.props;
    const { children, otherRenderComponent, includedStatusCodes } = this.props;
    const isErrExist = hasError && error !== null;
    const fallbacKUI = (err: ErrorFallbackProps['error']) =>
      errorFallback({
        error: err,
        reset: this.resetBoundary,
        otherRenderComponent,
        includedStatusCodes,
      });

    if (isInstanceOfAPIError(error)) {
      const { redirectUrl, notFound, status } = error;
      const isIncludeOtherStatus = includedStatusCodes?.some(
        (code) => code === status,
      );
      if (redirectUrl && !isIncludeOtherStatus) router.replace(redirectUrl);
      if (notFound) return <NotFoundPage />;
      if (isErrExist) return fallbacKUI(error);
    }

    if (isErrExist) return fallbacKUI(error);
    return children;
  }
}

export default withRouter(ErrorBoundary);
