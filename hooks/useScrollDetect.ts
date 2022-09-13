import { useEffect, useState } from 'react';

import { throttle } from 'lib/throttle';

const Dir = {
  up: 'up',
  down: 'down',
};

function useScrollDetect() {
  const threshold = 100;
  const [nextContainer, setNextContainer] = useState<HTMLElement | null>(null);
  const [scrollDir, setScrollDir] = useState(Dir.up);

  useEffect(() => {
    setNextContainer(document.getElementById('__next'));
  }, []);

  useEffect(() => {
    let prevScroll: number;
    if (nextContainer) prevScroll = nextContainer?.scrollTop;
    const scrolledMoreThanThreshold = (curScroll: number) =>
      Math.abs(curScroll - prevScroll) > threshold;

    const isScrollingUp = (curScroll: number) =>
      curScroll > prevScroll &&
      !(prevScroll > 0 && curScroll === 0) &&
      !(curScroll > 0 && prevScroll === 0);

    const updateScrollDirection = throttle(() => {
      let curScroll: number;
      if (nextContainer) {
        curScroll = nextContainer.scrollTop;
        if (scrolledMoreThanThreshold(curScroll)) {
          const newScroll = isScrollingUp(curScroll) ? Dir.down : Dir.up;
          setScrollDir(newScroll);
          prevScroll = curScroll > 0 ? curScroll : 0;
        }
      }
    }, 200);

    if (nextContainer)
      nextContainer.addEventListener('scroll', updateScrollDirection);

    return () => {
      if (nextContainer)
        nextContainer.removeEventListener('scroll', updateScrollDirection);
    };
  }, [nextContainer]);

  return scrollDir;
}

export default useScrollDetect;
