function getQueryString(queryObj: { [key: string]: string }) {
  return decodeURIComponent(new URLSearchParams(queryObj).toString());
}

export default getQueryString;
