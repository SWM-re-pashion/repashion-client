import classnames from 'classnames';

import { DefaultProps } from 'types/props';

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
