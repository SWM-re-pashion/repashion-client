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

  const onSwipeStart = (e: MouseEvent | TouchEvent) => {
    isDown = true;
    startX = getClientX(e);
  };

  const onSwipeMove = (e: MouseEvent | TouchEvent) => {
    if (!isDown) return;

    nowX = getClientX(e);
    setTranslateX(listX + nowX - startX);
  };

  const onSwipeEndOrLeave = (e: MouseEvent | TouchEvent) => {
    const list = listRef.current;
    const scrollWidth = list?.scrollWidth;
    const clientWidth = list?.clientWidth;
    const isWidthExist = clientWidth && scrollWidth;
    isDown = false;
    endX = getClientX(e);
    listX = getTranslateX(list);
    const distance = isWidthExist ? clientWidth - scrollWidth : 0;
    const isListStart = listX > 0;
    const isListEnd = isWidthExist && listX < distance;

    if (isListStart && list) {
      setTranslateX(0);
      listX = 0;
      return;
    }
    if (isListEnd) {
      setTranslateX(distance);
      listX = distance;
    }
  };

  const onClickWhenMoving = (e: MouseEvent) => {
    if (startX !== endX) e.stopPropagation();
  };

  useEffect(() => {
    const list = listRef.current;
    if (list) {
      list.addEventListener('mousedown', onSwipeStart);
      list.addEventListener('mouseup', onSwipeEndOrLeave);
      list.addEventListener('mouseleave', onSwipeEndOrLeave);
      list.addEventListener('mousemove', onSwipeMove);
      list.addEventListener('touchstart', onSwipeStart, {
        passive: true,
      });
      list.addEventListener('touchend', onSwipeEndOrLeave);
      list.addEventListener('touchcancel', onSwipeEndOrLeave);
      list.addEventListener('touchmove', onSwipeMove, {
        passive: true,
      });
      list.addEventListener('click', onClickWhenMoving);
    }

    return () => {
      if (list) {
        list.addEventListener('mousedown', onSwipeStart);
        list.addEventListener('mouseup', onSwipeEndOrLeave);
        list.addEventListener('mouseleave', onSwipeEndOrLeave);
        list.addEventListener('mousemove', onSwipeMove);
        list.addEventListener('touchstart', onSwipeStart, {
          passive: true,
        });
        list.addEventListener('touchend', onSwipeEndOrLeave);
        list.addEventListener('touchcancel', onSwipeEndOrLeave);
        list.addEventListener('touchmove', onSwipeMove, {
          passive: true,
        });
        list.addEventListener('click', onClickWhenMoving);
      }
    };
  }, [listRef]);
}
