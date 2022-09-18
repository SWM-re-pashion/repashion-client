import { useRouter } from 'next/router';

import { useCallback } from 'react';

function useQueryRouter(queryName: string) {
  const router = useRouter();
  const queryFunc = useCallback(
    (value?: string) =>
      router.push(
        {
          query: { ...router.query, [queryName]: value },
        },
        undefined,
        { shallow: true },
      ),
    [queryName, router],
  );
  return queryFunc;
}
export default useQueryRouter;
