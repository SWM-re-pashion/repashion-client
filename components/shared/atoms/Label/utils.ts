import $ from './style.module.scss';

export const font = (size: number | undefined) => {
  if (size === 25) return [$['font-25']];
  if (size === 24) return [$['font-24']];
  if (size === 20) return [$['font-20']];
  if (size === 18) return [$['font-18']];
  if (size === 16) return [$['font-16']];
  if (size === 14) return [$['font-14']];
  if (size === 13) return [$['font-13']];
  if (size === 12) return [$['font-12']];
  if (size === 10) return [$['font-10']];
  return undefined;
};
