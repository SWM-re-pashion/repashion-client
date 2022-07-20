import Image from 'next/image';

import { useRef } from 'react';

import { ImgProps } from '#types/index';
import type { StyleProps } from '#types/props';
import classnames from 'classnames';
import useDragScroll from 'hooks/useDragScroll';

import $ from './style.module.scss';

type Props = {
  imgList: ImgProps[];
} & StyleProps;
export default function ImgSlide({ className, style, imgList }: Props) {
  const dragRef = useRef<HTMLDivElement>(null);
  useDragScroll(dragRef);

  return (
    <article role="presentation" className={$['img-slides']} ref={dragRef}>
      <ul className={classnames($['img-lists'], className)} style={style}>
        {imgList.map(({ id, src, alt, width, height }) => {
          return (
            <li key={src + alt} className={$['img-wrapper']}>
              <Image {...{ src, alt, width, height }} priority />
            </li>
          );
        })}
      </ul>
    </article>
  );
}
