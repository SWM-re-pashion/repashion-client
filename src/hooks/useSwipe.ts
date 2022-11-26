import { RefObject, useEffect } from 'react';

export default function useSwipe(listRef: RefObject<HTMLElement>) {
  // 필요한 변수
  let isDown = false;
  let startX = 0;
  let nowX = 0;
  let endX = 0;
  let listX = 0;

  const getClientX = (e: MouseEvent | TouchEvent) => {
    if ('touches' in e) return e.changedTouches[0].clientX;
    return e.clientX;
  };

  const getTranslateX = (list: HTMLElement | null) => {
    if (list) {
      const { transform } = getComputedStyle(list);
      return parseInt(transform.split(/[^\-0-9.]+/g)[5], 10);
    }
    return 0;
  };

  const setTranslateX = (x: number) => {
    const list = listRef.current;
    if (list) list.style.transform = `translateX(${x}px)`;
  };

  const onScrollLeave = () => {
    if (isDown) {
      setTranslateX(0);
      listX = 0;
      isDown = false;
    }
  };

  const onScrollMove = (e: MouseEvent | TouchEvent) => {
    if (!isDown) return;

    nowX = getClientX(e);
    setTranslateX(listX + nowX - startX);
  };

  const onScrollEnd = (e: MouseEvent | TouchEvent) => {
    const list = listRef.current;
    const scrollWidth = list?.scrollWidth;
    const clientWidth = list?.clientWidth;
    const isWidthExist = clientWidth && scrollWidth;
    isDown = false;
    endX = getClientX(e);
    listX = getTranslateX(list);
    const isMoving = isWidthExist && listX < clientWidth - scrollWidth;

    if (listX > 0 && list) {
      setTranslateX(0);
      listX = 0;
      return;
    }
    if (isMoving) {
      setTranslateX(clientWidth - scrollWidth);
      listX = clientWidth - scrollWidth;
    }
  };

  const onScrollStart = (e: MouseEvent | TouchEvent) => {
    isDown = true;
    startX = getClientX(e);
  };

  const onClickWhenMoving = (e: MouseEvent) => {
    if (startX - endX !== 0) e.preventDefault();
  };

  useEffect(() => {
    const list = listRef.current;
    if (list) {
      list.addEventListener('mousedown', onScrollStart);
      list.addEventListener('mouseup', onScrollEnd);
      list.addEventListener('mouseleave', onScrollLeave);
      list.addEventListener('mousemove', onScrollMove);
      list.addEventListener('touchstart', onScrollStart, {
        passive: true,
      });
      list.addEventListener('touchend', onScrollEnd);
      list.addEventListener('touchcancel', onScrollLeave);
      list.addEventListener('touchmove', onScrollMove, {
        passive: true,
      });
      list.addEventListener('click', onClickWhenMoving);
    }

    return () => {
      if (list) {
        list.addEventListener('mousedown', onScrollStart);
        list.addEventListener('mouseup', onScrollEnd);
        list.addEventListener('mouseleave', onScrollLeave);
        list.addEventListener('mousemove', onScrollMove);
        list.addEventListener('touchstart', onScrollStart, {
          passive: true,
        });
        list.addEventListener('touchend', onScrollEnd);
        list.addEventListener('touchcancel', onScrollLeave);
        list.addEventListener('touchmove', onScrollMove, {
          passive: true,
        });
        list.addEventListener('click', onClickWhenMoving);
      }
    };
  }, [listRef]);
}
