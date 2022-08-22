import classnames from 'classnames';

import { StyleProps } from '#types/props';
import { Strong } from '@atoms/icon';

import $ from './style.module.scss';

type Props = {
  label: string;
  mid?: boolean;
} & StyleProps;

export default function StrongLabel({ label, className, mid }: Props) {
  return (
    <h2 className={classnames($['strong-label'], { [$.mid]: mid }, className)}>
      <Strong className={$['icon-left']} />
      <span className={$.label}>{label}</span>
      <Strong className={$['icon-right']} />
    </h2>
  );
}
