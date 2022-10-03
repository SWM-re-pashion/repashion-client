import { UrlQuery } from '#types/index';

function getQueryString(queryObj: { [key: string]: string }) {
  return decodeURIComponent(new URLSearchParams(queryObj).toString());
}

function getQueryStringObj<T extends string>(
  queries: [T, string][],
): Record<T, string> {
  return queries.reduce((acc, [key, value]) => {
    return { ...acc, [key]: value };
  }, {} as Record<T, string>);
}

function getQueriesArr<T>(
  datas: [T, string?][],
  urlQueries: UrlQuery[],
): [T, string][] {
  return datas.map(([key, value], i) => [
    key,
    (urlQueries[i] || value || '').toString(),
  ]);
}

export { getQueryString, getQueryStringObj, getQueriesArr };
