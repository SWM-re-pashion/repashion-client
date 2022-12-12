import Image from 'next/image';

import { DefaultProps } from '#types/props';
import { IMAGE_BLUR_DATA_URL } from '@constants/img';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props = {
  width: number;
  height: number;
  sizes: string;
  src: string;
  alt: string;
} & DefaultProps;

export default function ResponsiveImg(imgProps: Props) {
  const { width, height, sizes, src, alt, className, style, children } =
    imgProps;
  return (
    <div
      style={{ ...style }}
      className={classnames($['responsive-img'], className)}
    >
      <div className={$.inner}>
        <Image
          {...{ width, height, src, alt }}
          placeholder="blur"
          blurDataURL={IMAGE_BLUR_DATA_URL}
          sizes={sizes}
          priority
        />
        {children}
      </div>
    </div>
  );
}
