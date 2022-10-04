import { useRouter } from 'next/router';

import { getQueryStringObj, getQueriesArr } from 'utils';

function useSearch(target: string) {
  return useRouter().query[target]?.toString() || '';
}

function useMultipleSearch<T extends string>(
  queryDatas: [T, string?][],
  targets: readonly string[],
) {
  const router = useRouter();
  return getQueryStringObj(
    getQueriesArr<T>(
      queryDatas,
      targets.map((target) => router.query[target]),
    ),
  );
}

export { useSearch, useMultipleSearch };
