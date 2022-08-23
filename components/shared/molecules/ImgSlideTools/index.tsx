import { memo } from 'react';

import BackBtn from '@atoms/BackBtn';
import { More } from '@atoms/icon';
import classnames from 'classnames';

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
