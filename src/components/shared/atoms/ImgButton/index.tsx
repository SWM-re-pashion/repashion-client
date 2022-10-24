import Image from 'next/image';

import classnames from 'classnames';
import type { DefaultProps } from '#types/props';

import $ from './style.module.scss';

type Props = {
  width: number;
  height: number;
  src: string;
  alt: string;
  onClick?: () => void;
} & DefaultProps;

export default function ImgButton({
  className,
  style,
  width,
  height,
  src,
  alt,
  onClick,
}: Props) {
  return (
    <footer
      className={classnames($['img-btn'], className)}
      style={{ ...style }}
    >
      <button
        type="button"
        onClick={onClick}
        className={$.btn}
        aria-label={alt}
      >
        <Image {...{ src, alt, width, height }} priority />
      </button>
    </footer>
  );
}
