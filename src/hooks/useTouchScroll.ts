import { RefObject, useEffect } from 'react';

export default function useTouchScroll(listRef: RefObject<HTMLElement>) {
  const listScrollWidth = listRef.current?.scrollWidth;
  const listClientWidth = listRef.current?.clientWidth;
  // 필요한 변수
  let isDown = false;
  let startX = 0;
  let nowX = 0;
  let endX = 0;
  let listX = 0;

  const getClientX = (e: MouseEvent | TouchEvent) => {
    if ('touches' in e) return e.touches[0].clientX;
    return e.clientX;
  };

  const getTranslateX = () => {
    const list = listRef.current;
    if (list)
      return parseInt(
        getComputedStyle(list).transform.split(/[^\-0-9]+/g)[5],
        10,
      );
    return 0;
  };

  const setTranslateX = (x: number) => {
    const list = listRef.current;
    if (list) list.style.transform = `translateX(${x}px)`;
  };

  const onScrollLeave = (e: MouseEvent | TouchEvent) => {
    isDown = false;
  };

  const onScrollMove = (e: MouseEvent | TouchEvent) => {
    if (!isDown) return;

    nowX = getClientX(e);
    setTranslateX(listX + nowX - startX);
  };

  const onScrollEnd = (e: MouseEvent | TouchEvent) => {
    const list = listRef.current;
    isDown = false;
    endX = getClientX(e);
    listX = getTranslateX();
    console.log(listX);
    if (listX > 0 && list) {
      setTranslateX(0);
      listX = 0;
    } else if (
      listClientWidth &&
      listScrollWidth &&
      listX < listClientWidth - listScrollWidth
    ) {
      setTranslateX(listClientWidth - listScrollWidth);
      listX = listClientWidth - listScrollWidth;
    }
  };

  const onScrollStart = (e: MouseEvent | TouchEvent) => {
    isDown = true;
    startX = getClientX(e);
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
      }
    };
  }, [listRef]);
}
