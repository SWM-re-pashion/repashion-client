import { StyleProps } from '#types/props';
import classnames from 'classnames';

import $ from './style.module.scss';

export default function Required({ className, style }: StyleProps) {
  return (
    <span {...{ style }} className={classnames($.required, className)}>
      필수
    </span>
  );
}
