const filterPrice = (value: string, max: number) => {
  // 아래 함수와 Todo 공통화
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

export { filterPrice, filterHeight };
