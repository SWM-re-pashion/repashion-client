import React, { useCallback, useEffect, useState } from 'react';

import { DefaultProps } from '#types/props';
import classnames from 'classnames';

import { getClientX, getTranslateX } from '../Swiper/Swiper.utils';
import $ from './style.module.scss';

type Props = {
  imgListLen: number;
  backgroundColor?: string;
  slideCover?: JSX.Element;
  setImgNum?: React.Dispatch<React.SetStateAction<number>>;
} & DefaultProps;

function ImgSwiper(swiperProps: Props) {
  const { imgListLen, children, setImgNum, slideCover } = swiperProps;
  const { className, style, backgroundColor } = swiperProps;
  const listRef = React.useRef<HTMLUListElement>(null);
  const [translateX, setTranslateX] = useState(getTranslateX(listRef.current));
  const [imgCurrentNo, setImgCurrentNo] = useState(0);
  const [mouseDownClientX, setMouseDownClientX] = useState(0);
  const [mouseUpClientX, setMouseUpClientX] = useState(0);
  const [isDown, setDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);
  const [listX, setListX] = useState(0);

  const onSwiperAnimation = () => {
    const list = listRef.current;
    if (!list) return;
    list.style.transition = 'transform 0.35s ease-in-out';
  };

  const offSwiperAnimation = () => {
    const list = listRef.current;
    if (!list) return;
    list.style.transition = '';
  };

  const onSwipeStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    setDown(true);
    setStartX(getClientX(e));
    setMouseDownClientX(getClientX(e));
    offSwiperAnimation();
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
    const isEnd = e.type === 'mouseup' || e.type === 'touchend';
    const list = listRef.current;
    setDown(false);
    setEndX(getClientX(e));
    setListX(getTranslateX(list));
    if (isEnd) setMouseUpClientX(getClientX(e));
  };

  const onClickWhenMoving = (e: React.MouseEvent<HTMLDivElement>) => {
    if (startX !== endX) e.stopPropagation();
  };

  const onChangeImg = useCallback(
    (index: number) => {
      if (imgListLen <= index || index < 0) return;
      setImgCurrentNo(index);
      if (setImgNum) setImgNum(index);
    },
    [imgListLen, setImgNum],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.keyCode === 37) {
      onChangeImg(imgCurrentNo - 1);
      return;
    }
    if (e.keyCode === 39) onChangeImg(imgCurrentNo + 1);
  };

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

  useEffect(() => {
    const dragSpace = Math.abs(mouseDownClientX - mouseUpClientX);
    const isOverThreshold = dragSpace > 100;
    const isLeft = mouseUpClientX < mouseDownClientX && isOverThreshold;
    const isRight = mouseUpClientX > mouseDownClientX && isOverThreshold;

    if (isLeft || isRight) {
      onSwiperAnimation();
      onChangeImg(imgCurrentNo + (isLeft ? 1 : -1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouseUpClientX]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    onSwiperAnimation();
    setTranslateX(-imgCurrentNo * listRef.current.clientWidth);
    setListX(-imgCurrentNo * listRef.current.clientWidth);
  }, [imgCurrentNo]);

  return (
    <div
      tabIndex={0}
      role="slider"
      aria-valuenow={imgCurrentNo + 1}
      aria-valuemin={1}
      aria-valuemax={imgListLen}
      aria-roledescription="carousel"
      aria-label="이미지 슬라이드를 방향키로 움직일 수 있습니다."
      aria-orientation="horizontal"
      className={classnames($.slider, className)}
      style={{ ...style, backgroundColor }}
      onMouseDown={onSwipeStart}
      onMouseUp={onSwipeEndOrLeave}
      onMouseLeave={onSwipeEndOrLeave}
      onMouseMove={onSwipeMove}
      onTouchStart={onSwipeStart}
      onTouchEnd={onSwipeEndOrLeave}
      onTouchMove={onSwipeMove}
      onTouchCancel={onSwipeEndOrLeave}
      onClick={onClickWhenMoving}
      onKeyDown={onKeyDown}
    >
      <ul
        ref={listRef}
        className={$['slide-list']}
        style={{ transform: `translateX(${translateX}px)` }}
      >
        {children}
      </ul>
      {slideCover}
    </div>
  );
}

export default ImgSwiper;
