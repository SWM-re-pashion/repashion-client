import { memo } from 'react';

import BorderBox from '@atoms/BorderBox';
import Span from '@atoms/Span';

import $ from './style.module.scss';

type Props = {
  isSoldOut: boolean;
};

function SoldoutBox(itemProps: Props) {
  const { isSoldOut } = itemProps;

  if (isSoldOut) {
    return (
      <BorderBox borderRadius="5px" className={$['soldout-box']}>
        <Span fontSize={12} color="#fff">
          sold out
        </Span>
      </BorderBox>
    );
  }
  return null;
}

export default memo(SoldoutBox);
