import { DefaultProps } from '#types/props';
import classnames from 'classnames';

import $ from './style.module.scss';

export default function Title({ className, style, children }: DefaultProps) {
  return (
    <h1 {...{ style }} className={classnames($.title, className)}>
      {children}
    </h1>
  );
}
