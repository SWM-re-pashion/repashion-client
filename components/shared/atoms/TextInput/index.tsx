import classnames from 'classnames';
import { StyleProps } from 'types/props';

import $ from './style.module.scss';

type Props = {
  placeholder: string;
} & StyleProps;

export default function TextInput({ style, className, placeholder }: Props) {
  return (
    <input
      {...{ style, placeholder }}
      type="text"
      className={classnames($['text-input'], className)}
    />
  );
}
