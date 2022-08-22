import classnames from 'classnames';

import { StyleProps } from '#types/props';

import $ from './style.module.scss';

type Props = {
  label: string;
  desc: string | number | undefined;
  isTop?: boolean;
  isBottom?: boolean;
} & StyleProps;

export default function ProductCell({
  label,
  desc,
  isBottom,
  isTop,
  className,
}: Props) {
  return (
    <div
      className={classnames(
        $['product-cell'],
        { [$.bottom]: isBottom },
        { [$.top]: isTop },
        className,
      )}
    >
      <strong className={$.label}>{label}</strong>
      <span className={classnames($.label, $.desc)}>{desc}</span>
    </div>
  );
}
