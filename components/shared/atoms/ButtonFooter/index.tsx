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
      <button
        type="button"
        onClick={onClick}
        className={classnames($.btn, { [$.error]: msg })}
        aria-label={`${children}버튼`}
      >
        {children}
      </button>
      {msg && <span className={$['error-msg']}>{msg}</span>}
    </footer>
  );
}
