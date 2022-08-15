export const filterPrice = (value: string, max: number) => {
  const filteredValue = value.replace(/[^0-9]/g, '');

  if (+filteredValue > max) {
    if (filteredValue.substring(0, 7) === `${max}`) {
      return max;
    }
    return filteredValue.substring(0, 6);
  }
  return +filteredValue;
};
