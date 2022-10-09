import React, { ReactElement } from 'react';

import { isInstanceOfAPIError } from 'api/core/error';

import NotFound from './NotFound';

type ErrorFallbackProps<ErrorType extends Error = Error> = {
  error: ErrorType;
  reset: (...args: unknown[]) => void;
};

type ErrorFallbackType = <ErrorType extends Error>(
  props: ErrorFallbackProps<ErrorType>,
) => React.ReactNode;

type Props = {
  resetQuery?: () => void;
  errorFallback: ErrorFallbackType;
  children: ReactElement;
  keys?: unknown[];
};

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

export default class ErrorBoundary extends React.Component<Props, State> {
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
    const { errorFallback } = this.props;
    const { children } = this.props;

    if (hasError && error !== null) {
      if (isInstanceOfAPIError(error)) {
        const { redirectUrl, notFound } = error;

        if (notFound) {
          return <NotFound />;
        }
        if (redirectUrl) {
          window.location.href = redirectUrl;
        }
      }

      return errorFallback({
        error,
        reset: this.resetBoundary,
      });
    }

    return children;
  }
}
