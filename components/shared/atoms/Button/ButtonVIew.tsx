import { CSSProperties } from 'react';

import classnames from 'classnames';
import type { DefaultProps } from 'types/props';

import $ from './style.module.scss';

type Props = {
  handleClick: () => void;
  customStyle: CSSProperties;
  className?: string;
  iconBtn?: boolean;
  errorMsg?: string;
  ariaLabel: string;
  children: React.ReactNode;
} & DefaultProps;

function ButtonView(btnProps: Props) {
  const { iconBtn, errorMsg, ariaLabel, children } = btnProps;
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
        { [$.error]: errorMsg },
      )}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

export default ButtonView;
