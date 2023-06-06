import { priceInitState } from 'src/store/constants';

const max = priceInitState[1];
const min = priceInitState[0];
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
