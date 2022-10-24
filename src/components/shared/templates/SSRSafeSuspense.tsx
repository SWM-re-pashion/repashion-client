/* eslint-disable react/jsx-no-useless-fragment */
import { ComponentProps, Suspense } from 'react';

import { useMounted } from 'src/hooks';

export default function SSRSafeSuspense(
  props: ComponentProps<typeof Suspense>,
) {
  const isMounted = useMounted();
  const { fallback } = props;

  if (isMounted) return <Suspense {...props} />;
  return <>{fallback}</>;
}
