import { useRouter } from 'next/router';

import { memo } from 'react';

import { Arrow } from '@atoms/icon/Arrow';
import { More } from '@atoms/icon/More';

import $ from './style.module.scss';

function ImgSlideTools() {
  const router = useRouter();
  const handleClick = () => router.back();

  return (
    <article className={$['header-box']}>
      <Arrow className={$['back-btn']} onClick={handleClick} />
      <More className={$['more-btn']} />
    </article>
  );
}

export default memo(ImgSlideTools);
