export const getTranslateX = (list: HTMLElement | null) => {
  if (list) {
    const { transform } = getComputedStyle(list);
    return parseInt(transform.split(/[^\-0-9.]+/g)[5], 10);
  }
  return 0;
};

export const getClientX = (
  e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
) => {
  if ('touches' in e) return e.changedTouches[0].clientX;
  return e.clientX;
};
