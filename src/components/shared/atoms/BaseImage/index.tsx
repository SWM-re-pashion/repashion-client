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
  const isPerformanceConsidered = width > 40;
  const placeholder = isPerformanceConsidered ? 'blur' : undefined;
  const blurDataURL = isPerformanceConsidered ? IMAGE_BLUR_DATA_URL : undefined;

  return (
    <Image
      {...{ width, height, src, alt, style }}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      sizes={sizes}
      priority
    />
  );
}
