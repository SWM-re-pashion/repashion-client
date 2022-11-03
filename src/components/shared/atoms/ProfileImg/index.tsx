import Image from 'next/image';

import { ImgProps } from '#types/index';
import type { DefaultProps } from '#types/props';
import classnames from 'classnames';

import $ from './style.module.scss';

export default function ProfileImg({
  className,
  style,
  width = 36,
  height = 36,
  src,
  alt,
}: DefaultProps & ImgProps) {
  return (
    <span
      className={classnames($['profile-img'], className)}
      style={{ ...style, width: `${width}px`, height: `${height}px` }}
    >
      <Image {...{ src, alt, width, height }} priority />
    </span>
  );
}
