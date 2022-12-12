import Image from 'next/image';

import { memo, useRef } from 'react';

import { UserInfo } from '#types/info';
import { DefaultProps } from '#types/props';
import { Check } from '@atoms/icon';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props = {
  id?: number;
  src?: string;
  alt?: string;
  isNeedClick?: boolean;
  isSelected?: boolean;
  isLoading?: boolean;
  onClick?: (value: number, type: keyof UserInfo) => void;
} & DefaultProps;

function ImgBox({
  className,
  id,
  src,
  alt,
  isNeedClick = false,
  isSelected,
  isLoading,
  onClick,
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
      // TODO: 서비스 고도화 전까지 styles 데이터 주석
      // onClick={() => {
      //   if (id && isNeedClick && onClick) onClick(id, 'styles');
      // }}
      // onKeyPress={() => {
      //   if (id && isNeedClick && onClick) onClick(id, 'styles');
      // }}
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
