import { ComponentProps, PropsWithChildren, useCallback } from 'react';

import { useQueryErrorResetBoundary } from '@tanstack/react-query';

import ErrorBoundary from './ErrorBoundary';
import SSRSafeSuspense from './SSRSafeSuspense';

type ErrorBoundaryProps = ComponentProps<typeof ErrorBoundary>;

type Props = {
  suspenseFallback: ComponentProps<typeof SSRSafeSuspense>['fallback'];
  errorFallback: ErrorBoundaryProps['errorFallback'];
  keys?: Array<unknown>;
  otherRenderComponent?: JSX.Element;
  includedStatusCodes?: number[];
};

function AsyncBoundary(props: PropsWithChildren<Props>) {
  const { suspenseFallback, errorFallback, children, keys } = props;
  const { otherRenderComponent, includedStatusCodes } = props;
  const { reset } = useQueryErrorResetBoundary();
  const resetHandler = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <ErrorBoundary
      resetQuery={resetHandler}
      {...{ errorFallback, keys }}
      {...{ otherRenderComponent, includedStatusCodes }}
    >
      <SSRSafeSuspense fallback={suspenseFallback}>{children}</SSRSafeSuspense>
    </ErrorBoundary>
  );
}

export default AsyncBoundary;
