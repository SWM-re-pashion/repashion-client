export const deepClone = (obj: any) => {
  if (!(obj instanceof Object)) return obj;
  let clone: any;
  const Constructor = obj.constructor;

  switch (Constructor) {
    case RegExp:
      clone = new Constructor(obj);
      break;
    case Date:
      clone = new Constructor(obj.getTime());
      break;
    default:
      clone = new Constructor();
  }

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = typeof value === 'object' ? deepClone(value) : value;
    }
  });

  return clone;
};
