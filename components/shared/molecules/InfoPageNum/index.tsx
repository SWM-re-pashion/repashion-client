import { memo } from 'react';

import classnames from 'classnames';

import BorderBox from '@atoms/BorderBox';
import { DefaultProps } from 'types/props';

import $ from './style.module.scss';

function InfoPageNum({ className, style, children }: DefaultProps) {
  return (
    <BorderBox {...{ style }} className={classnames($['page-num'], className)}>
      {children}
    </BorderBox>
  );
}

export default memo(InfoPageNum);
