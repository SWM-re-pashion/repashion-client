import classNames from 'classnames';
import type { DefaultProps } from 'types/props';

import $ from './style.module.scss';
import { font } from './utils';

type Props = {
  color?: string;
  fontSize?: number;
  fontWeight?: number;
} & DefaultProps;

export default function Span(labelProps: Props) {
  const { className, style, color, fontSize, fontWeight, children } =
    labelProps;

  return (
    <span
      style={{ ...style, color, fontWeight }}
      className={classNames($.label, className, font(fontSize))}
    >
      {children}
    </span>
  );
}
