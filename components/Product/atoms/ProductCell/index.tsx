import { StyleProps } from '#types/props';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props = {
  label: string;
  desc: string | number | undefined;
  isBottom?: boolean;
} & StyleProps;

export default function ProductCell({
  label,
  desc,
  isBottom,
  className,
}: Props) {
  return (
    <div
      className={classnames(
        $['product-cell'],
        { [$.bottom]: isBottom },
        className,
      )}
    >
      <strong className={$.label}>{label}</strong>
      <span className={classnames($.label, $.desc)}>{desc}</span>
    </div>
  );
}
