import { memo } from 'react';

import classnames from 'classnames';
import type { DefaultProps } from 'types/props';

import $ from './style.module.scss';

type Props<T> = {
  color?: string;
  fontWeight?: number;
  label?: string;
  iconBtn?: boolean;
  background?: string;
  borderRadius?: string;
  onClick?: () => void;
  onQueryClick?: (value: T) => void;
  value?: T;
  errorMsg?: string;
} & DefaultProps;

function Button<T>(btnProps: Props<T>) {
  const { color, fontWeight, borderRadius, value } = btnProps;
  const { label, iconBtn, background, onClick, errorMsg } = btnProps;
  const { className, style, children, onQueryClick } = btnProps;

  return (
    <button
      type="button"
      onClick={() => {
        if (onClick) onClick();
        if (onQueryClick && label && value) onQueryClick(value);
      }}
      style={{
        ...style,
        color,
        fontWeight,
        backgroundColor: background,
        borderRadius,
      }}
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

const typedMemo: <T>(c: T) => T = memo;
export default typedMemo(Button);
