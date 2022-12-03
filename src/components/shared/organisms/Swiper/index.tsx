import React, { useEffect, useState } from 'react';

import { DefaultProps } from '#types/props';
import { getClientX, getTranslateX } from '@organisms/Swiper/Swiper.utils';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props = {
  wrapperClassName?: string;
  listClassName?: string;
  ariaLabel?: string;
} & Omit<DefaultProps, 'className'>;

function Swiper(swiperProps: Props) {
  const { children, style, wrapperClassName, listClassName, ariaLabel } =
    swiperProps;
  const listRef = React.useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(getTranslateX(listRef.current));
  const [isDown, setDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);
  const [listX, setListX] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    const scrollWidth = list?.scrollWidth;
    const clientWidth = list?.clientWidth;
    const isWidthExist = clientWidth && scrollWidth;
    const distance = isWidthExist ? clientWidth - scrollWidth : 0;
    const isListStart = listX > 0;
    const isListEnd = isWidthExist && listX < distance;

    if (!list) return;
    if (isListStart) {
      setTranslateX(0);
      setListX(0);
      return;
    }
    if (isListEnd) {
      setTranslateX(distance);
      setListX(distance);
    }
  }, [listX]);

  const onSwipeStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    setDown(true);
    setStartX(getClientX(e));
  };

  const onSwipeMove = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    if (!isDown) return;
    const nowX = getClientX(e);
    setTranslateX(listX + nowX - startX);
  };

  const onSwipeEndOrLeave = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    const list = listRef.current;
    setDown(false);
    setEndX(getClientX(e));
    setListX(getTranslateX(list));
  };

  const onClickWhenMoving = (e: React.MouseEvent<HTMLDivElement>) => {
    if (startX !== endX) e.stopPropagation();
  };

  return (
    <div
      className={classnames($['swiper-wrapper'], wrapperClassName)}
      aria-label={ariaLabel}
    >
      <div
        ref={listRef}
        role="presentation"
        className={listClassName}
        style={{ ...style, transform: `translateX(${translateX}px)` }}
        onMouseDown={onSwipeStart}
        onMouseUp={onSwipeEndOrLeave}
        onMouseMove={onSwipeMove}
        onMouseLeave={onSwipeEndOrLeave}
        onTouchStart={onSwipeStart}
        onTouchEnd={onSwipeEndOrLeave}
        onTouchCancel={onSwipeEndOrLeave}
        onTouchMove={onSwipeMove}
        onClick={onClickWhenMoving}
      >
        {children}
      </div>
    </div>
  );
}

export default Swiper;
