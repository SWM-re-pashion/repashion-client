import Image from 'next/image';

import classnames from 'classnames';
import type { DefaultProps } from 'types/props';

import $ from './style.module.scss';
import { ImgProps } from '#types/index';

type Props = {} & DefaultProps & ImgProps;

export default function ProfileImg({
  className,
  style,
  width = 44,
  height = 44,
  src,
  alt,
}: Props) {
  return (
    <span
      className={classnames($['profile-img'], className)}
      style={{ ...style }}
    >
      <Image {...{ src, alt, width, height }} />
    </span>
  );
}
