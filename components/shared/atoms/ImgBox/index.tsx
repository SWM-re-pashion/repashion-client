import Image from 'next/image';

import classnames from 'classnames';
import { DefaultProps } from 'types/props';

import $ from './style.module.scss';

type Props = {
  src: string;
  alt: string;
  background?: string;
  isNeedClick?: boolean;
} & DefaultProps;

export default function ImgBox({
  className,
  src,
  alt,
  background,
  isNeedClick = false,
  style,
}: Props) {
  return (
    <div
      className={classnames($['img-box'], className, {
        [$['click-mode']]: isNeedClick,
      })}
      style={{ background, ...style }}
    >
      <Image {...{ src, alt }} layout="fill" />
    </div>
  );
}
