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

function useQueryObjRouter() {
  const router = useRouter();
  const queryFunc = useCallback(
    (queryObj: { [queryName: string]: string | null }) =>
      router.push(
        {
          query: { ...router.query, ...queryObj },
        },
        undefined,
        { shallow: true },
      ),
    [router],
  );
  return queryFunc;
}
export { useQueryRouter, useQueryObjRouter };
