import classnames from 'classnames';
import type { DefaultProps } from 'types/props';

import $ from './style.module.scss';

type Props = {
  label?: string;
  iconBtn?: boolean;
  background?: string;
  onClick?: () => void;
  errorMsg?: string;
} & DefaultProps;

export default function Button(btnProps: Props) {
  const { label, iconBtn, background, onClick, errorMsg } = btnProps;
  const { className, style, children } = btnProps;
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ ...style, backgroundColor: background }}
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
