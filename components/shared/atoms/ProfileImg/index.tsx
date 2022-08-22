import Image from 'next/image';

import classnames from 'classnames';

import { ImgProps } from '#types/index';
import type { DefaultProps } from 'types/props';

import $ from './style.module.scss';

export default function ProfileImg({
  className,
  style,
  width = 44,
  height = 44,
  src,
  alt,
}: DefaultProps & ImgProps) {
  return (
    <span
      className={classnames($['profile-img'], className)}
      style={{ ...style }}
    >
      <Image {...{ src, alt, width, height }} />
    </span>
  );
}
