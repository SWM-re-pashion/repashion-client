import Image from 'next/image';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ImgProps } from '#types/index';
import type { DefaultProps } from '#types/props';
import InfoPageNum from '@molecules/InfoPageNum';
import classnames from 'classnames';
import SoldoutBox from 'src/components/Shop/molecules/SoldoutBox';
import useDragScroll from 'src/hooks/useDragScroll';

import $ from './style.module.scss';

type Props = {
  imgList: (ImgProps | string)[];
  isSoldOut: boolean;
} & DefaultProps;

export default function ImgSlide(slideProps: Props) {
  const { children, className, style, imgList, isSoldOut } = slideProps;
  const [imgCurrentNo, setImgCurrentNo] = useState(0);
  const [mouseDownClientX, setMouseDownClientX] = useState(0);
  const [mouseUpClientX, setMouseUpClientX] = useState(0);
  const dragRef = useRef<HTMLDivElement>(null);
  const ref = dragRef.current;
  // const isSoldOut = status === 'soldout'; // TODO: 추후에 상품 상태 추가
  const currentImgNo = imgCurrentNo + 1;
  const imgListLen = imgList.length;
  useDragScroll(dragRef);

  const onChangeImg = useCallback(
    (index: number) => {
      if (imgList.length <= index || index < 0) return;
      setImgCurrentNo(index);
    },
    [imgList],
  );

  useEffect(() => {
    const dragSpace = Math.abs(mouseDownClientX - mouseUpClientX);

    if (mouseDownClientX !== 0) {
      if (mouseUpClientX < mouseDownClientX && dragSpace > 100) {
        onChangeImg(imgCurrentNo + 1);
      } else if (mouseUpClientX > mouseDownClientX && dragSpace > 100) {
        onChangeImg(imgCurrentNo - 1);
      }
    }
  }, [mouseUpClientX]);

  const onMouseTouchDown = (num: number) => setMouseDownClientX(num);
  const onMouseTouchUp = (num: number) => setMouseUpClientX(num);
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.keyCode === 37) {
      onChangeImg(imgCurrentNo - 1);
      return;
    }
    if (e.keyCode === 39) onChangeImg(imgCurrentNo + 1);
  };

  return (
    <section className={$['slide-box']}>
      {children}

      <div
        tabIndex={0}
        role="slider"
        aria-valuenow={currentImgNo}
        aria-valuemin={1}
        aria-valuemax={imgListLen}
        aria-roledescription="carousel"
        aria-label="이미지 슬라이드를 방향키로 움직일 수 있습니다."
        aria-orientation="horizontal"
        className={$.slider}
        ref={dragRef}
        style={style}
        onTouchStart={(e: React.TouchEvent) =>
          onMouseTouchDown(e.changedTouches[0].pageX)
        }
        onTouchEnd={(e: React.TouchEvent) =>
          onMouseTouchUp(e.changedTouches[0].pageX)
        }
        onMouseDown={(e: React.MouseEvent) => onMouseTouchDown(e.clientX)}
        onMouseUp={(e: React.MouseEvent) => onMouseTouchUp(e.clientX)}
        onKeyDown={onKeyDown}
      >
        <ul
          role="region"
          className={classnames($['slide-list'], className)}
          style={{
            transform: `translateX(
                ${ref && -ref.clientWidth * imgCurrentNo + ref.scrollLeft}px)`,
          }}
        >
          {imgList.map((img, idx) => {
            const key =
              (typeof img !== 'string' ? img.src + img.alt : img) + idx;
            const src = typeof img !== 'string' ? img.src : img;
            const alt = typeof img !== 'string' ? img.alt : `이미지${idx + 1}`;
            return (
              <li
                key={key}
                className={$.slide}
                aria-roledescription="slide"
                aria-label={`${imgListLen}개의 이미지 중 ${imgCurrentNo}번째 이미지`}
              >
                <Image {...{ src, alt }} layout="fill" priority />
              </li>
            );
          })}
        </ul>

        <SoldoutBox {...{ isSoldOut }} />
      </div>

      <InfoPageNum
        className={$['page-num']}
      >{`${currentImgNo}/${imgListLen}`}</InfoPageNum>
    </section>
  );
}
