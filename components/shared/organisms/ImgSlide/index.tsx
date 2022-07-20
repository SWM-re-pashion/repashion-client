import Image from 'next/image';

import { useRef } from 'react';

import { ImgProps } from '#types/index';
import type { StyleProps } from '#types/props';
import ImgSlideTools from '@molecules/ImgSlideTools';
import classnames from 'classnames';
import useDragScroll from 'hooks/useDragScroll';

import $ from './style.module.scss';

type Props = {
  imgList: ImgProps[];
} & StyleProps;

export default function ImgSlide({ className, style, imgList }: Props) {
  const dragRef = useRef<HTMLUListElement>(null);
  useDragScroll(dragRef);

  return (
    <section className={$['slide-box']}>
      <ImgSlideTools />

      <article role="presentation" className={$.slider} ref={dragRef}>
        <ul className={classnames($['slide-list'], className)} style={style}>
          {imgList.map(({ id, src, alt }) => (
            <li key={src + alt} className={$.slide}>
              <Image {...{ src, alt }} layout="fill" priority />
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
