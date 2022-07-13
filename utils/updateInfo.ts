export function updateInfo<T>(arr: T[], value: T) {
  return arr.find((x) => x === value) === undefined
    ? [...arr, value]
    : arr.filter((x) => x !== value);
}
