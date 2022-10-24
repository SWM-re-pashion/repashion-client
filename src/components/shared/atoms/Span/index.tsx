import type { DefaultProps } from '#types/props';
import classNames from 'classnames';

import $ from './style.module.scss';
import { font } from './utils';

type Props = {
  color?: string;
  fontSize?: number;
  fontWeight?: number;
  isStrongFontFamily?: boolean;
} & DefaultProps;

export default function Span(labelProps: Props) {
  const { className, style, children } = labelProps;
  const { color, fontSize, fontWeight, isStrongFontFamily } = labelProps;

  return (
    <span
      style={{ ...style, color, fontWeight }}
      className={classNames($.label, className, font(fontSize), {
        [$['strong-font-family']]: isStrongFontFamily,
      })}
    >
      {children}
    </span>
  );
}
