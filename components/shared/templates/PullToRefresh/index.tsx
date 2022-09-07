/* eslint-disable consistent-return */
import { useCallback, useEffect, useRef } from 'react';

import { DIRECTION, isTreeScrollable } from './utils';

export type Props = {
  isPullable?: boolean;
  canFetchMore?: boolean;
  onRefresh: () => Promise<any>;
  refreshingContent: JSX.Element | string;
  children: JSX.Element;
  pullDownThreshold?: number;
  maxPullDownDistance?: number;
  backgroundColor?: string;
  className?: string;
};

function PullToRefresh(refreshProps: Props) {
  const { isPullable = true, canFetchMore = false } = refreshProps;
  const { onRefresh } = refreshProps;
  const { refreshingContent, children } = refreshProps;
  const { pullDownThreshold = 60, maxPullDownDistance = 95 } = refreshProps;
  const { backgroundColor, className = '' } = refreshProps;

  const containerRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);
  const pullDownRef = useRef<HTMLDivElement>(null);
  const isCanRelease = useRef(false);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const currentY = useRef(0);
  // const isCanFetchMore = false; // true이면 fetchMore 로더가 표시됩니다.

  const initContainer = (): void => {
    requestAnimationFrame(() => {
      if (childrenRef.current && containerRef.current) {
        childrenRef.current.style.overflowX = 'hidden';
        childrenRef.current.style.overflowY = 'auto';
        containerRef.current.style.transform = 'none';
      }
      if (pullDownRef.current) {
        pullDownRef.current.style.opacity = '0';
        pullDownRef.current.style.display = 'none';
      }

      if (isCanRelease.current) isCanRelease.current = false;
    });
  };

  const onTouchStart = useCallback((e: MouseEvent | TouchEvent): void => {
    isDragging.current = false;
    if (e instanceof MouseEvent) {
      startY.current = e.pageY;
    }
    if (window.TouchEvent && e instanceof TouchEvent) {
      startY.current = e.touches[0].pageY;
    }
    currentY.current = startY.current;

    if (
      e.type === 'touchstart' &&
      isTreeScrollable(e.target as HTMLElement, DIRECTION.up)
    ) {
      return;
    }

    // top이 보이지 않으면 취소
    if (
      childrenRef.current &&
      childrenRef.current.getBoundingClientRect().top < 0
    ) {
      return;
    }

    isDragging.current = true;
  }, []);

  const onTouchMove = useCallback(
    (e: MouseEvent | TouchEvent): void => {
      if (!isDragging.current) {
        return;
      }

      if (window.TouchEvent && e instanceof TouchEvent) {
        currentY.current = e.touches[0].pageY;
      } else {
        currentY.current = (e as MouseEvent).pageY;
      }
      if (currentY.current < startY.current) {
        isDragging.current = false;
        return;
      }

      if (e.cancelable) {
        e.preventDefault();
      }

      const yDistanceMoved = Math.min(
        currentY.current - startY.current,
        maxPullDownDistance,
      );

      if (yDistanceMoved >= pullDownThreshold) {
        isDragging.current = true;
      }

      // maxPullDownDistance에 도달하면 애니메이션 종료
      if (yDistanceMoved >= maxPullDownDistance) {
        return;
      }
      if (pullDownRef.current && containerRef.current) {
        pullDownRef.current.style.opacity = (yDistanceMoved / 65).toString();
        containerRef.current.style.transform = `translate(0px, ${yDistanceMoved}px)`;
        pullDownRef.current.style.display = 'block';
      }
    },
    [maxPullDownDistance, pullDownThreshold],
  );

  const onEnd = useCallback(() => {
    const yDistanceMoved = Math.min(
      currentY.current - startY.current,
      maxPullDownDistance,
    );

    if (yDistanceMoved >= pullDownThreshold) {
      isCanRelease.current = true;
    }

    isDragging.current = false;
    startY.current = 0;
    currentY.current = 0;

    // 충분히 드래그하지 않았다면, 애니메이션 되돌리기
    if (!isCanRelease.current) {
      initContainer();
      return;
    }

    if (containerRef.current) {
      containerRef.current.style.transform = 'translate(0px, 0px)';
    }

    // onRefresh().then(initContainer).catch(initContainer);
    navigator.vibrate(200);
    onRefresh();
    setTimeout(() => {
      initContainer();
    }, 2000);
  }, [maxPullDownDistance, onRefresh, pullDownThreshold]);

  useEffect(() => {
    if (!isPullable || !childrenRef.current) return;
    const childrenEl = childrenRef.current;
    childrenEl.addEventListener('touchstart', onTouchStart, { passive: true });
    childrenEl.addEventListener('touchmove', onTouchMove, { passive: false });
    childrenEl.addEventListener('touchend', onEnd);

    return () => {
      childrenEl.removeEventListener('touchstart', onTouchStart);
      childrenEl.removeEventListener('touchmove', onTouchMove);
      childrenEl.removeEventListener('touchend', onEnd);
    };
  }, [
    children,
    isPullable,
    onRefresh,
    pullDownThreshold,
    maxPullDownDistance,
    canFetchMore,
    onTouchStart,
    onTouchMove,
    onEnd,
  ]);

  return (
    <div
      className={className}
      style={{
        backgroundColor,
        transition: 'transform 0.2s cubic-bezier(0, 0, 0.31, 1)',
      }}
      ref={containerRef}
    >
      <div
        ref={pullDownRef}
        style={{
          display: 'none',
        }}
      >
        {refreshingContent}
      </div>
      <div ref={childrenRef}>{children}</div>
    </div>
  );
}

export default PullToRefresh;
