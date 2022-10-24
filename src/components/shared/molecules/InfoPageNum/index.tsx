import { memo } from 'react';

import { DefaultProps } from '#types/props';
import BorderBox from '@atoms/BorderBox';
import classnames from 'classnames';

import $ from './style.module.scss';

function InfoPageNum({ className, style, children }: DefaultProps) {
  return (
    <BorderBox {...{ style }} className={classnames($['page-num'], className)}>
      {children}
    </BorderBox>
  );
}

export default memo(InfoPageNum);
