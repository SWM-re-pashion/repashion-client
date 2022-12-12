import { DefaultProps } from '#types/props';
import BaseImage from '@atoms/BaseImage';
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
        <BaseImage {...{ width, height, src, alt, sizes }} />
        {children}
      </div>
    </div>
  );
}
