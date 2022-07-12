export const updateInfo = (size: string[], value: string) =>
  size.find((x) => x === value) === undefined
    ? [...size, value]
    : size.filter((x) => x !== value);
