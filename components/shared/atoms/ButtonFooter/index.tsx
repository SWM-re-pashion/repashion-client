import classnames from 'classnames';
import type { DefaultProps } from 'types/props';

import $ from './style.module.scss';

type Props = {
  onClick?: () => void;
  msg?: string;
} & DefaultProps;

export default function ButtonFooter({
  className,
  style,
  children,
  onClick,
  msg,
}: Props) {
  return (
    <footer
      className={classnames($['btn-footer'], className)}
      style={{ ...style }}
    >
      {msg && <span className={$['error-msg']}>{msg}</span>}
      <button
        type="button"
        onClick={onClick}
        className={classnames($.btn, { [$.error]: msg })}
      >
        {children}
      </button>
    </footer>
  );
}
