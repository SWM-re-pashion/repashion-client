const filterPrice = (value: string, max: number) => {
  const filteredValue = value.replace(/[^0-9]/g, '');

  if (+filteredValue > max) {
    if (filteredValue.substring(0, 7) === `${max}`) {
      return max;
    }
    return filteredValue.substring(0, 6);
  }
  return +filteredValue;
};

const filterHeight = (value: string) => {
  const filteredValue = value.replace(/[^0-9]/g, '');

  if (+filteredValue > 200) {
    if (filteredValue.substring(0, 3) > '200') {
      return filteredValue.substring(0, 2);
    }
    return filteredValue.substring(0, 3);
  }
  return filteredValue;
};

export { filterPrice, filterHeight };
