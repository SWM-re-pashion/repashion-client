import { useRouter } from 'next/router';

import { useCallback } from 'react';

import { RouterFunc } from '#types/index';

function useQueryRouter(queryName: string, type?: RouterFunc) {
  const router = useRouter();
  const routerFunc = type === 'REPLACE' ? router.replace : router.push;

  const queryFunc = useCallback(
    (value?: string) =>
      routerFunc(
        {
          query: { ...router.query, [queryName]: value },
        },
        undefined,
        { shallow: true },
      ),
    [queryName, router.query, routerFunc],
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
