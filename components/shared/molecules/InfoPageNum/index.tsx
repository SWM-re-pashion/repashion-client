import BorderBox from '@atoms/BorderBox';
import classnames from 'classnames';
import { DefaultProps } from 'types/props';

import $ from './style.module.scss';

export default function InfoHeader({
  className,
  style,
  children,
}: DefaultProps) {
  return (
    <BorderBox {...{ style }} className={classnames($['page-num'], className)}>
      {children}
    </BorderBox>
  );
}
