import { useRouter } from 'next/router';

import { getQueryStringObj, getQueriesArr, getPropFromQuery } from 'src/utils';

function useSearch(target: string) {
  return getPropFromQuery(useRouter().asPath.split('?')[1], target) || '';
}

function useMultipleSearch<T extends string>(
  queryDatas: [T, string?][],
  targets: readonly string[],
) {
  const router = useRouter();
  return getQueryStringObj(
    getQueriesArr<T>(
      queryDatas,
      targets.map(
        (target) => getPropFromQuery(router.asPath.split('?')[1], target) || '',
      ),
    ),
  );
}

export { useSearch, useMultipleSearch };
