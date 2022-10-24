import { DefaultProps } from '#types/props';
import classnames from 'classnames';

import $ from './style.module.scss';

export default function Description({
  className,
  style,
  children,
}: DefaultProps) {
  return (
    <span {...{ style }} className={classnames($.description, className)}>
      {children}
    </span>
  );
}
