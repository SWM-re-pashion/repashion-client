import Image from 'next/image';

import { memo } from 'react';

import { ImgClose } from '@atoms/icon';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props = {
  id: number;
  first: boolean;
  src: string;
  remove: (deleteId: number) => void;
  onClick?: (id: number) => void;
  noMargin?: boolean;
  btnColor?: string;
};

function ImgCard(imgProps: Props) {
  const { id, first, src, remove, onClick, noMargin, btnColor } = imgProps;
  const removeImg = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    remove(id);
  };
  const handleClick = () => {
    if (onClick) onClick(id);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={classnames($['img-card'], { [$['no-margin']]: noMargin })}
      onClick={handleClick}
      onKeyDown={handleClick}
    >
      <Image src={src} alt={`${id}번째 사진`} width="106" height="106" />
      <button
        type="button"
        className={$['img-close']}
        {...{ onClick: removeImg }}
      >
        <ImgClose fill={btnColor} />
      </button>
      {first && (
        <div className={$.representative}>
          <span>대표사진</span>
        </div>
      )}
    </div>
  );
}

export default memo(ImgCard);
