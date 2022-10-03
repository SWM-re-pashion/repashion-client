export const isRootCategory = (subQuery?: string) =>
  subQuery?.slice(-3) === '000' || !subQuery;
