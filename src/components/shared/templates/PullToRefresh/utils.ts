type Direction = 'up' | 'down';

export const DIRECTION = Object.freeze({
  up: 'up',
  down: 'down',
});

export function isOverflowScrollable(element: HTMLElement) {
  const overflowType = getComputedStyle(element).overflowY;
  if (element === document.scrollingElement && overflowType === 'visible') {
    return true;
  }

  if (overflowType !== 'scroll' && overflowType !== 'auto') {
    return false;
  }

  return true;
}

export function isScrollable(element: HTMLElement, direction: Direction) {
  if (!isOverflowScrollable(element)) {
    return false;
  }

  if (direction === DIRECTION.down) {
    const bottomScroll = element.scrollTop + element.clientHeight;

    return bottomScroll < element.scrollHeight;
  }

  if (direction === DIRECTION.up) {
    return element.scrollTop > 0;
  }

  throw new Error('unsupported direction');
}

export function isTreeScrollable(
  element: HTMLElement,
  dir: Direction,
): boolean {
  if (isScrollable(element, dir)) {
    return true;
  }

  // body가 overflowY: hidden이면 scrollingElement가 그렇지 않더라도 스크롤이 비활성화됩니다.
  if (
    element === document.body &&
    getComputedStyle(document.body).overflowY === 'hidden'
  ) {
    return false;
  }

  if (element.parentElement == null) {
    return false;
  }

  return isTreeScrollable(element.parentElement, dir);
}
