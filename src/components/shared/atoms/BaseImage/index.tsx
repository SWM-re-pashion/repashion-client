import Image from 'next/image';

import { StyleProps } from '#types/props';
import { IMAGE_BLUR_DATA_URL } from '@constants/img';

type Props = {
  width: number;
  height: number;
  src: string;
  alt: string;
  sizes?: string;
} & StyleProps;

export default function BaseImage(imgProps: Props) {
  const { width, height, sizes, src, alt, style } = imgProps;
  return (
    <Image
      {...{ width, height, src, alt, style }}
      placeholder="blur"
      blurDataURL={IMAGE_BLUR_DATA_URL}
      sizes={sizes}
      priority
    />
  );
}
