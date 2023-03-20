import { CSSProperties } from 'react';

import type { DefaultProps } from '#types/props';
import classnames from 'classnames';

import $ from './style.module.scss';

export type ButtonProps = {
  handleClick?: () => void;
  iconBtn?: boolean;
  hasErrorMsg?: boolean;
  disabled?: boolean;
} & DefaultProps;

type Props = {
  customStyle: CSSProperties;
  ariaLabel: string;
} & ButtonProps;

function ButtonView(btnProps: Props) {
  const { iconBtn, hasErrorMsg, ariaLabel, children } = btnProps;
  const { handleClick, customStyle, className, disabled } = btnProps;

  return (
    <button
      disabled={disabled}
      type="button"
      onClick={handleClick}
      style={customStyle}
      className={classnames(
        $.btn,
        className,
        { [$['icon-btn']]: iconBtn },
        { [$.error]: hasErrorMsg },
        { [$.disabled]: disabled },
      )}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

export default ButtonView;
