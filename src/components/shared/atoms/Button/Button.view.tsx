/* eslint-disable react/button-has-type */
import { ButtonHTMLAttributes, CSSProperties } from 'react';

import type { DefaultProps } from '#types/props';
import classnames from 'classnames';

import $ from './style.module.scss';

export type ButtonProps = {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  handleClick?: () => void;
  iconBtn?: boolean;
  hasErrorMsg?: boolean;
  disabled?: boolean;
} & DefaultProps;

type Props = ButtonProps & {
  type: NonNullable<ButtonProps['type']>;
  customStyle: CSSProperties;
  ariaLabel: string;
};

function ButtonView(btnProps: Props) {
  const { iconBtn, hasErrorMsg, ariaLabel, children, type } = btnProps;
  const { handleClick, customStyle, className, disabled } = btnProps;

  return (
    <button
      disabled={disabled}
      type={type || 'button'}
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
