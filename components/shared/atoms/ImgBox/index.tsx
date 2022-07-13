import Image from 'next/image';

import { memo } from 'react';

import classnames from 'classnames';
import { DefaultProps } from 'types/props';

import $ from './style.module.scss';

type Props = {
  id: number;
  src: string;
  alt: string;
  isNeedClick?: boolean;
  isSelected?: boolean;
  handleClick?: (id: number) => void;
} & DefaultProps;

function ImgBox({
  className,
  id,
  src,
  alt,
  isNeedClick = false,
  isSelected,
  handleClick,
  style,
}: Props) {
  return (
    <div
      className={classnames($['img-box'], className, {
        [$['click-mode']]: isNeedClick,
        [$.selected]: isSelected,
      })}
      style={{ ...style }}
      role="button"
      tabIndex={0}
      onClick={() => {
        if (isNeedClick && handleClick) handleClick(id);
      }}
      onKeyPress={() => {
        if (isNeedClick && handleClick) handleClick(id);
      }}
      aria-label={`${alt} 이미지 박스`}
    >
      <Image
        {...{ src, alt }}
        width="233"
        height="233"
        layout="responsive"
        priority
      />
    </div>
  );
}
export default memo(ImgBox);
