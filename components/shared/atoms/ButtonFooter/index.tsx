import classnames from 'classnames';
import type { DefaultProps } from 'types/props';

import $ from './style.module.scss';

type Props = {
  onClick?: () => void;
} & DefaultProps;

export default function ButtonFooter({
  className,
  style,
  children,
  onClick,
}: Props) {
  return (
    <footer
      className={classnames($['btn-footer'], className)}
      style={{ ...style }}
    >
      <button type="button" onClick={onClick}>
        {children}
      </button>
    </footer>
  );
}
