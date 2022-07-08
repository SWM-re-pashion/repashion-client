import classnames from 'classnames';
import BorderBox from 'components/shared/atoms/BorderBox';
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
