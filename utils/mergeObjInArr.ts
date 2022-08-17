export const mergeObjInArr = <T, K extends keyof T>(
  arr1: Array<T> | undefined,
  arr2: Array<T> | undefined,
  comparekey: K,
  keyToMerge: K,
) => {
  const map = new Map();
  if (arr1) arr1.forEach((item) => map.set(item[comparekey], item));
  if (arr2) {
    arr2.forEach((item) => {
      const getItem = map.get(item[comparekey]);
      if (
        getItem &&
        item[comparekey] &&
        item[keyToMerge] &&
        Array.isArray(item[keyToMerge])
      ) {
        map.set(item[comparekey], {
          ...getItem,
          [keyToMerge]: [...getItem[keyToMerge], ...item[keyToMerge]],
        });
      } else {
        map.set(item[comparekey], item);
      }
    });
  }
  return Array.from(map.values());
};
