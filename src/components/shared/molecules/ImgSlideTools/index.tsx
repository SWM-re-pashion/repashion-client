import { memo } from 'react';

import { DefaultData } from '#types/index';
import BackBtn from '@atoms/BackBtn';
import { More } from '@atoms/icon';
import DropDown from '@molecules/DropDown';

import $ from './style.module.scss';

type Props = {
  options: Partial<DefaultData>[];
};

function ImgSlideTools({ options }: Props) {
  return (
    <div className={$['header-box']}>
      <BackBtn className={$.btn} />
      <DropDown
        className={$.more}
        options={options}
        name="see-more"
        right="32px"
      >
        <More className={$.btn} />
      </DropDown>
    </div>
  );
}

export default memo(ImgSlideTools);
