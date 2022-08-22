import { memo } from 'react';

import classnames from 'classnames';

import BackBtn from '@atoms/BackBtn';
import { More } from '@atoms/icon';

import $ from './style.module.scss';

function ImgSlideTools() {
  return (
    <div className={$['header-box']}>
      <BackBtn className={$.btn} />
      <More className={classnames($.btn, $.more)} />
    </div>
  );
}

export default memo(ImgSlideTools);
