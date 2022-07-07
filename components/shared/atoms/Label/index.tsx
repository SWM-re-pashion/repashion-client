import classNames from 'classnames';
import type { DefaultProps } from 'types/props';

import $ from './style.module.scss';

export default function Label({ className, style, children }: DefaultProps) {
  return (
    <span {...{ style }} className={classNames($.label, className)}>
      {children}
    </span>
  );
}
