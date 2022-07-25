import classNames from 'classnames';
import type { DefaultProps } from 'types/props';

import $ from './style.module.scss';

type Props = {
  color?: string;
} & DefaultProps;

export default function Label({ className, style, color, children }: Props) {
  return (
    <span
      style={{ ...style, color }}
      className={classNames($.label, className)}
    >
      {children}
    </span>
  );
}
