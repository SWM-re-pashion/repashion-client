import { useRouter } from 'next/router';

import { getQueryStringObj, getQueriesArr, getPropFromQuery } from 'src/utils';

function useSearch(target: string) {
  const { pathname, asPath } = useRouter();
  const query = asPath.replace(pathname, '');
  return getPropFromQuery(query, target) || '';
}

function useMultipleSearch<T extends string>(
  queryDatas: [T, string?][],
  targets: readonly string[],
) {
  const { pathname, asPath } = useRouter();
  const query = asPath.replace(pathname, '');
  return getQueryStringObj(
    getQueriesArr<T>(
      queryDatas,
      targets.map((target) => getPropFromQuery(query, target) || ''),
    ),
  );
}

export { useSearch, useMultipleSearch };
