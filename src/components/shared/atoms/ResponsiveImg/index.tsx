import Image from 'next/image';

import { DefaultProps } from '#types/props';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props = {
  width: number;
  height: number;
  src: string;
  alt: string;
} & DefaultProps;

export default function ResponsiveImg(imgProps: Props) {
  const { width, height, src, alt, className, style, children } = imgProps;
  return (
    <div
      style={{ ...style }}
      className={classnames($['responsive-img'], className)}
    >
      <Image {...{ width, height, src, alt }} layout="responsive" priority />
      {children}
    </div>
  );
}
