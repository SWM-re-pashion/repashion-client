import Image from 'next/image';

import classnames from 'classnames';
import { StyleProps } from 'types/props';

import $ from './style.module.scss';

type Props = {
  width: number;
  height: number;
  src: string;
  alt: string;
} & StyleProps;

export default function BasicImg(imgProps: Props) {
  const { width, height, src, alt, className, style } = imgProps;
  return (
    <div
      style={{ ...style, width, height }}
      className={classnames($['basic-img'], className)}
    >
      <Image {...{ width, height, src, alt }} layout="fixed" />
    </div>
  );
}
