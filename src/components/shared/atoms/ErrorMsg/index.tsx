import React, { memo } from 'react';

import Span from '@atoms/Span';

import $ from './style.module.scss';

type Props = {
  isValid: boolean;
  msg: string;
};

function ErrorMsg(msgProps: Props) {
  const { isValid, msg } = msgProps;

  if (isValid) return null;
  return (
    !isValid && (
      <Span fontWeight={600} className={$['error-msg']}>
        {msg}
      </Span>
    )
  );
}

export default memo(ErrorMsg);
