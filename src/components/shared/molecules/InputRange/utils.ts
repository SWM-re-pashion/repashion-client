const inputProps = (value: number, step: number, min: number, max: number) => ({
  type: 'range',
  min,
  max,
  value,
  step,
});

export { inputProps };
