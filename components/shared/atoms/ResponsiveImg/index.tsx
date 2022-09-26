import Image from 'next/image';

import classnames from 'classnames';
import { DefaultProps } from 'types/props';

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
      <Image {...{ width, height, src, alt }} layout="responsive" />
      {children}
    </div>
  );
}
