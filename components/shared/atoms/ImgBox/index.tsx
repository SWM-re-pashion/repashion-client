import Image from 'next/image';

import { memo, useRef } from 'react';

import { Check } from '@atoms/icon';
import classnames from 'classnames';
import { UserInfo } from 'types/info';
import { DefaultProps } from 'types/props';

import $ from './style.module.scss';

type Props = {
  id?: number;
  src?: string;
  alt?: string;
  isNeedClick?: boolean;
  isSelected?: boolean;
  isLoading?: boolean;
  handleClick?: (type: keyof UserInfo, value: number) => void;
} & DefaultProps;

function ImgBox({
  className,
  id,
  src,
  alt,
  isNeedClick = false,
  isSelected,
  isLoading,
  handleClick,
  style,
}: Props) {
  const boxRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={classnames($['img-box'], className, {
        [$['click-mode']]: isNeedClick,
        [$.selected]: isSelected && isNeedClick,
        [$.loading]: isLoading,
      })}
      style={{ ...style }}
      role="button"
      tabIndex={0}
      onClick={() => {
        if (id && isNeedClick && handleClick) handleClick('styles', id);
      }}
      onKeyPress={() => {
        if (id && isNeedClick && handleClick) handleClick('styles', id);
      }}
      aria-label={`${alt} 이미지 박스`}
      ref={boxRef}
    >
      {!isLoading && src ? (
        <Image
          {...{ src, alt }}
          width="233"
          height="233"
          layout="responsive"
          priority
        />
      ) : (
        <div className={$.skeleton} />
      )}

      {isSelected && (
        <div className={$['selected-box']}>
          <Check className={$.icon} />
        </div>
      )}
    </div>
  );
}
export default memo(ImgBox);
