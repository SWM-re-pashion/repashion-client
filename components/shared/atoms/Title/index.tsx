import classnames from 'classnames';
import { DefaultProps } from 'types/props';

import $ from './style.module.scss';

export default function Title({ className, style, children }: DefaultProps) {
  return (
    <h2 {...{ style }} className={classnames($.title, className)}>
      {children}
    </h2>
  );
}
