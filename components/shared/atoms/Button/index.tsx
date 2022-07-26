import classnames from 'classnames';
import type { DefaultProps } from 'types/props';

import $ from './style.module.scss';

type Props = {
  background?: string;
  onClick?: () => void;
  errorMsg?: string;
} & DefaultProps;

export default function Button({
  className,
  style,
  children,
  background,
  onClick,
  errorMsg,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ ...style, backgroundColor: background }}
      className={classnames($.btn, className, { [$.error]: errorMsg })}
      aria-label={`${children}`}
    >
      {children}
    </button>
  );
}
