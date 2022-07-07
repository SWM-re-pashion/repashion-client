import classNames from 'classnames';
import type { StyleProps } from 'types/props';

import $ from './style.module.scss';

type Props = {
  label: string;
} & StyleProps;

export default function Label({ className, style, label }: Props) {
  return (
    <span {...{ style }} className={classNames($.label, className)}>
      {label}
    </span>
  );
}
