export const replace = (str: string, current: string, future: string) =>
  str.replace(RegExp(current, 'g'), future);
