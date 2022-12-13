import Image from 'next/image';

import { IMAGE_BLUR_DATA_URL } from '@constants/img';

type Props = {
  width: number;
  height: number;
  sizes?: string;
  src: string;
  alt: string;
};

export default function BaseImage(imgProps: Props) {
  const { width, height, sizes, src, alt } = imgProps;
  return (
    <Image
      {...{ width, height, src, alt }}
      placeholder="blur"
      blurDataURL={IMAGE_BLUR_DATA_URL}
      sizes={sizes}
      priority
    />
  );
}
