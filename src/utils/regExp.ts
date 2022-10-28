export const isSameRegExpCondition = (condition: RegExp, str: string) =>
  condition.test(str);
