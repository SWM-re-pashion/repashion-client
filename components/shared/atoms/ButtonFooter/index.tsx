import classnames from 'classnames';
import type { DefaultProps } from 'types/props';

import $ from './style.module.scss';

export default function ButtonFooter({
  className,
  style,
  children,
}: DefaultProps) {
  return (
    <div
      className={classnames($['btn-footer'], className)}
      style={{ ...style }}
    >
      <button type="button">{children}</button>
    </div>
  );
}
