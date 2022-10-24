const max = 1000000;
const min = 0;
const step = 10000;

export type PriceProps = {
  label: string;
  max: number;
  min: number;
  step: number;
  states: [number, number];
};

const priceProps = (states: [number, number]): PriceProps => ({
  label: '가격',
  max,
  min,
  step,
  states,
});

export { max, min, step, priceProps };
