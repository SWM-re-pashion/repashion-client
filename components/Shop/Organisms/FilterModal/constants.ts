const max = 1000000;
const min = 0;
const step = 10000;

const priceProps = (states: [number, number]) => ({
  label: '가격',
  max,
  min,
  step,
  states,
});

export { max, min, step, priceProps };
