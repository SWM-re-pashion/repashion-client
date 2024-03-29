/* eslint-disable consistent-return */
import { useCallback, useEffect, useRef, useState } from 'react';

import PullToRefreshView from './PullToRefresh.view';
import { DIRECTION, isTreeScrollable } from './utils';

export type Props<T> = {
  isPullable?: boolean;
  canFetchMore?: boolean;
  onRefresh?: () => Promise<T>;
  refreshingContent: JSX.Element | string;
  children: JSX.Element;
  pullDownThreshold?: number;
  maxPullDownDistance?: number;
};

function PullToRefresh<T>(refreshProps: Props<T>) {
  const { isPullable = true, canFetchMore = false } = refreshProps;
  const { onRefresh } = refreshProps;
  const { refreshingContent, children } = refreshProps;
  const { pullDownThreshold = 60, maxPullDownDistance = 95 } = refreshProps;

  const [isDisplayRefresh, setDisplayRefresh] = useState(false);
  const childrenRef = useRef<HTMLDivElement>(null);
  const pullDownRef = useRef<HTMLDivElement>(null);
  const isCanRelease = useRef(false);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const currentY = useRef(0);

  const initContainer = (): void => {
    requestAnimationFrame(() => {
      if (childrenRef.current && childrenRef.current) {
        childrenRef.current.style.overflowX = 'hidden';
        childrenRef.current.style.overflowY = 'auto';
        childrenRef.current.style.transform = 'translate(0px, 0px)';
      }
      if (pullDownRef.current) {
        pullDownRef.current.style.opacity = '0';
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
        setDisplayRefresh(false);
        return;
      }

      if (e.cancelable) {
        e.preventDefault();
      }
      setDisplayRefresh(true);
      const yDistanceMoved = Math.min(
        currentY.current - startY.current,
        maxPullDownDistance,
      );

      // maxPullDownDistance에 도달하면 애니메이션 종료
      if (yDistanceMoved >= maxPullDownDistance) {
        return;
      }
      if (pullDownRef.current && childrenRef.current) {
        pullDownRef.current.style.opacity = (yDistanceMoved / 65).toString();
        childrenRef.current.style.transform = `translate(0px, ${yDistanceMoved}px)`;
      }
    },
    [maxPullDownDistance],
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
      setDisplayRefresh(false);
      return;
    }

    if (childrenRef.current) {
      childrenRef.current.style.transform = `translate(0px, ${pullDownThreshold}px)`;
    }

    if (onRefresh) {
      onRefresh()
        .then(() => {
          initContainer();
          setDisplayRefresh(false);
        })
        .catch(() => {
          initContainer();
          setDisplayRefresh(false);
        });
    }
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
    <PullToRefreshView
      {...{
        pullDownRef,
        childrenRef,
        children,
        refreshingContent: isDisplayRefresh ? refreshingContent : null,
      }}
    />
  );
}

export default PullToRefresh;
