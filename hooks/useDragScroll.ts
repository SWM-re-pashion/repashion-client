import { RefObject, useEffect } from 'react';

export default function useDragScroll(dragRef: RefObject<HTMLElement>) {
  let isDown = false;
  let startX: number;
  let startScrollLeft: number;

  const mouseTouchDown = (e: MouseEvent | TouchEvent) => {
    const ref = dragRef.current;
    if (ref) {
      isDown = true;
      if (e.type === 'mousedown' && 'pageX' in e) {
        startX = e.pageX - ref.offsetLeft;
      } else if (e.type === 'touchstart' && 'touches' in e) {
        startX = e.touches[0].pageX - ref.offsetLeft;
      }
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
    const ref = dragRef.current;

    if (!isDown) return;
    e.preventDefault();

    if (ref) {
      if (e.type === 'mousemove' && 'pageX' in e) {
        const currentX = e.pageX - ref.offsetLeft;
        const walk = currentX - startX;
        ref.scrollLeft = startScrollLeft - walk;
      } else if (e.type === 'touchmove' && 'touches' in e) {
        const currentX = e.touches[0].pageX - ref.offsetLeft;
        const walk = currentX - startX;
        ref.scrollLeft = startScrollLeft - walk;
      }
    }
  };

  useEffect(() => {
    const ref = dragRef.current;
    if (ref) {
      ref.addEventListener('mousedown', mouseTouchDown);
      ref.addEventListener('mouseleave', mouseTouchLeave);
      ref.addEventListener('mouseup', mouseTouchUp);
      ref.addEventListener('mousemove', mouseTouchMove);
      ref.addEventListener('touchstart', mouseTouchDown);
      ref.addEventListener('touchcancel', mouseTouchLeave);
      ref.addEventListener('touchend', mouseTouchUp);
      ref.addEventListener('touchmove', mouseTouchMove);
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
