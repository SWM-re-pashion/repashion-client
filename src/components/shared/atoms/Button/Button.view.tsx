import { CSSProperties } from 'react';

import type { DefaultProps } from '#types/props';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props = {
  handleClick?: () => void;
  customStyle: CSSProperties;
  className?: string;
  iconBtn?: boolean;
  hasErrorMsg?: boolean;
  ariaLabel: string;
  children: React.ReactNode;
} & DefaultProps;

function ButtonView(btnProps: Props) {
  const { iconBtn, hasErrorMsg, ariaLabel, children } = btnProps;
  const { handleClick, customStyle, className } = btnProps;

  return (
    <button
      type="button"
      onClick={handleClick}
      style={customStyle}
      className={classnames(
        $.btn,
        className,
        { [$['icon-btn']]: iconBtn },
        { [$.error]: hasErrorMsg },
      )}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

export default ButtonView;
