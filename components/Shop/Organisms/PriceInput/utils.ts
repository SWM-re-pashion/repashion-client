const priceInputProps = (
  idx: number,
  states: [number, number],
  value: number,
) => ({
  controlled: true,
  subType: idx,
  value: `${states[idx]}`,
  placeholder: !idx
    ? `${value.toLocaleString()}원 부터`
    : `${value.toLocaleString()}원 까지`,
});

const rangeProps = (
  states: [number, number],
  step: number,
  min: number,
  max: number,
) => ({
  left: states[0],
  right: states[1],
  step,
  minValue: min,
  maxValue: max,
});

export { priceInputProps, rangeProps };
