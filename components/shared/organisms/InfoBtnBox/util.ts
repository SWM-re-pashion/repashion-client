import $ from './style.module.scss';

export const columns = (length: number) => {
  if (length <= 4) return [$['column-4']];
  if (length <= 7) return [$['column-6']];
  if (length <= 8) return [$['column-8']];
  if (length <= 11) return [$['column-9']];
  if (length <= 12) return [$['column-12']];
  if (length <= 14) return [$['column-13']];
  if (length <= 16) return [$['column-15']];
  return [$['column-17']];
};
