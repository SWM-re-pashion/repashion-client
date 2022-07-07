import classnames from 'classnames';
import { DefaultProps } from 'types/props';

import $ from './style.module.scss';

export default function BorderBox({
  className,
  style,
  children,
}: DefaultProps) {
  return (
    <div {...{ style }} className={classnames($['border-box'], className)}>
      {children}
    </div>
  );
}
