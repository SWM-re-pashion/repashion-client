function getQueryString(queryObj: { [key: string]: string }) {
  return new URLSearchParams(queryObj).toString();
}

export default getQueryString;
