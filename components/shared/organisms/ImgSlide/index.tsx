import Image from 'next/image';

import { useCallback, useEffect, useRef, useState } from 'react';

import classnames from 'classnames';

import { ImgProps } from '#types/index';
import type { StyleProps } from '#types/props';
import ImgSlideTools from '@molecules/ImgSlideTools';
import InfoPageNum from '@molecules/InfoPageNum';
import useDragScroll from 'hooks/useDragScroll';

import $ from './style.module.scss';

type Props = {
  imgList: (ImgProps | string)[];
} & StyleProps;

export default function ImgSlide({ className, style, imgList }: Props) {
  const [imgCurrentNo, setImgCurrentNo] = useState(0);
  const [mouseDownClientX, setMouseDownClientX] = useState(0);
  const [mouseUpClientX, setMouseUpClientX] = useState(0);
  const dragRef = useRef<HTMLDivElement>(null);
  const ref = dragRef.current;
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

  return (
    <section className={$['slide-box']}>
      <ImgSlideTools />

      <article className={$.slider} ref={dragRef} style={style}>
        <ul
          role="presentation"
          className={classnames($['slide-list'], className)}
          style={{
            transform: `translateX(
                ${ref && -ref.clientWidth * imgCurrentNo + ref.scrollLeft}px)`,
          }}
          onTouchStart={(e: React.TouchEvent) =>
            onMouseTouchDown(e.changedTouches[0].pageX)
          }
          onTouchEnd={(e: React.TouchEvent) =>
            onMouseTouchUp(e.changedTouches[0].pageX)
          }
          onMouseDown={(e: React.MouseEvent) => onMouseTouchDown(e.clientX)}
          onMouseUp={(e: React.MouseEvent) => onMouseTouchUp(e.clientX)}
        >
          {imgList.map((img, idx) => {
            const key =
              (typeof img !== 'string' ? img.src + img.alt : img) + idx;
            const src = typeof img !== 'string' ? img.src : img;
            const alt = typeof img !== 'string' ? img.alt : `이미지${idx + 1}`;
            return (
              <li key={key} className={$.slide}>
                <Image {...{ src, alt }} layout="fill" priority />
              </li>
            );
          })}
        </ul>
      </article>

      <InfoPageNum className={$['page-num']}>{`${imgCurrentNo + 1}/${
        imgList.length
      }`}</InfoPageNum>
    </section>
  );
}
