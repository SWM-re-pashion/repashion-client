import { RefObject, useEffect } from 'react';

export default function useDragScroll(dragRef: RefObject<HTMLElement>) {
  let isDown = false;
  let startX: number;
  let startScrollLeft: number;

  const getPageX = (e: MouseEvent | TouchEvent) => {
    if ('touches' in e) return e.touches[0].pageX;
    return e.pageX;
  };

  const mouseTouchDown = (e: MouseEvent | TouchEvent) => {
    const ref = dragRef.current;
    if (ref) {
      isDown = true;
      startX = getPageX(e) - ref.offsetLeft;
      startScrollLeft = ref.scrollLeft;
    }
  };
  const mouseTouchLeave = (e: MouseEvent | TouchEvent) => {
    isDown = false;
  };
  const mouseTouchUp = (e: MouseEvent | TouchEvent) => {
    isDown = false;
  };
  const mouseTouchMove = (e: MouseEvent | TouchEvent) => {
    if (!isDown) return;
    if (e.cancelable) e.preventDefault();
    const ref = dragRef.current;

    if (ref) {
      const currentX = getPageX(e) - ref.offsetLeft;
      const walk = currentX - startX;
      ref.scrollLeft = startScrollLeft - walk;
    }
  };

  useEffect(() => {
    const ref = dragRef.current;
    if (ref) {
      ref.addEventListener('mousedown', mouseTouchDown);
      ref.addEventListener('mouseleave', mouseTouchLeave);
      ref.addEventListener('mouseup', mouseTouchUp);
      ref.addEventListener('mousemove', mouseTouchMove);
      ref.addEventListener('touchstart', mouseTouchDown, {
        passive: true,
      });
      ref.addEventListener('touchcancel', mouseTouchLeave);
      ref.addEventListener('touchend', mouseTouchUp);
      ref.addEventListener('touchmove', mouseTouchMove, {
        passive: true,
      });
    }

    return () => {
      if (ref) {
        ref.removeEventListener('mousedown', mouseTouchDown);
        ref.removeEventListener('mouseleave', mouseTouchLeave);
        ref.removeEventListener('mouseup', mouseTouchUp);
        ref.removeEventListener('mousemove', mouseTouchMove);
        ref.removeEventListener('touchstart', mouseTouchDown);
        ref.removeEventListener('touchcancel', mouseTouchLeave);
        ref.removeEventListener('touchend', mouseTouchUp);
        ref.removeEventListener('touchmove', mouseTouchMove);
      }
    };
  }, [dragRef]);
}
