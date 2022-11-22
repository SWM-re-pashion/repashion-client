export const isSameRegExpCondition = (condition: RegExp, str: string) =>
  condition.test(str);

export const isSameMultipleRegExp = (regExps: RegExp[], str: string) => {
  return regExps.map((regExp) => regExp.test(str));
};
