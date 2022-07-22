import { useRouter } from 'next/router';

import { memo } from 'react';

import { Arrow } from '@atoms/icon/Arrow';
import { More } from '@atoms/icon/More';
import classnames from 'classnames';

import $ from './style.module.scss';

function ImgSlideTools() {
  const router = useRouter();
  const handleClick = () => router.back();

  return (
    <div className={$['header-box']}>
      <Arrow className={$.btn} onClick={handleClick} />
      <More className={classnames($.btn, $.more)} />
    </div>
  );
}

export default memo(ImgSlideTools);
