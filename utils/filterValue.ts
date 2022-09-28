const validatePriceRange = (
  value: string,
  priceArr: [number, number],
  idx?: number,
) => {
  const filteredValue = +value.replace(/[^0-9]/g, '');

  if (idx === undefined) return filteredValue.toString();
  const appositeIdx = +!idx;
  const isLeft = idx < appositeIdx;
  const prevValue = priceArr[idx];

  if (
    (isLeft && priceArr[appositeIdx] < filteredValue) ||
    (!isLeft && priceArr[appositeIdx] > filteredValue)
  ) {
    return prevValue.toString();
  }

  return filteredValue.toString();
};

const filterMaxPrice = (value: string, max: number) => {
  // TODO: 함수와  공통화
  const filteredValue = value.replace(/[^0-9]/g, '');

  if (+filteredValue > max) {
    if (filteredValue.substring(0, 7) === `${max}`) {
      return max.toString();
    }
    return (+filteredValue).toString().substring(0, 6);
  }
  return (+filteredValue).toString();
};

const filterHeight = (value: string) => {
  const filteredValue = value.replace(/[^0-9]/g, '');

  if (+filteredValue > 200) {
    if (filteredValue.substring(0, 3) > '200') {
      return (+filteredValue).toString().substring(0, 2);
    }
    return (+filteredValue).toString().substring(0, 3);
  }
  return (+filteredValue).toString();
};

export { filterMaxPrice, filterHeight, validatePriceRange };
