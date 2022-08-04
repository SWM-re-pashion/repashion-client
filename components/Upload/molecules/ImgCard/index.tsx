import Image from 'next/image';

import { memo } from 'react';

import { ImgClose } from '@atoms/icon';

import $ from './style.module.scss';

type Props = {
  id: number;
  first: boolean;
  src: string;
  remove: (deleteId: number) => void;
};

function ImgCard(imgProps: Props) {
  const { id, first, src, remove } = imgProps;
  const onClick = () => {
    remove(id);
  };

  return (
    <div className={$['img-card']}>
      <Image src={src} alt={`${id}번째 사진`} width="106" height="106" />
      <button type="button" className={$['img-close']} {...{ onClick }}>
        <ImgClose />
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
