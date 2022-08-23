import classnames from 'classnames';
import type { DefaultProps } from 'types/props';

import $ from './style.module.scss';

type Props = {
  color?: string;
  fontWeight?: number;
  label?: string;
  iconBtn?: boolean;
  background?: string;
  onClick?: () => void;
  errorMsg?: string;
} & DefaultProps;

export default function Button(btnProps: Props) {
  const { color, fontWeight } = btnProps;
  const { label, iconBtn, background, onClick, errorMsg } = btnProps;
  const { className, style, children } = btnProps;
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ ...style, color, fontWeight, backgroundColor: background }}
      className={classnames(
        $.btn,
        className,
        { [$['icon-btn']]: iconBtn },
        { [$.error]: errorMsg },
      )}
      aria-label={label || `${children}`}
    >
      {children}
    </button>
  );
}
