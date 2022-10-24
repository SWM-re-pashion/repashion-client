import { DefaultProps } from '#types/props';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props = {
  borderRadius?: string;
} & DefaultProps;

export default function BorderBox(boxProps: Props) {
  const { className, style, children, borderRadius } = boxProps;
  return (
    <div
      style={{ ...style, borderRadius }}
      className={classnames($['border-box'], className)}
    >
      {children}
    </div>
  );
}
