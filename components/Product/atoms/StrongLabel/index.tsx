import { StyleProps } from '#types/props';
import { Strong } from '@atoms/icon/Strong';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props = {
  label: string;
} & StyleProps;

export default function StrongLabel({ label, className }: Props) {
  return (
    <h2 className={classnames($['strong-label'], className)}>
      <Strong className={$['icon-left']} />
      <span className={$.label}>{label}</span>
      <Strong className={$['icon-right']} />
    </h2>
  );
}
