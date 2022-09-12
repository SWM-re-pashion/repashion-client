import { memo } from 'react';

import { QueryChange } from '#types/index';
import classnames from 'classnames';
import type { DefaultProps } from 'types/props';

import $ from './style.module.scss';

type Props = {
  color?: string;
  fontWeight?: number;
  label?: string;
  iconBtn?: boolean;
  background?: string;
  borderRadius?: string;
  onClick?: () => void;
  queryName?: string;
  queryCode?: string;
  onQueryClick?: QueryChange;
  errorMsg?: string;
} & DefaultProps;

function Button(btnProps: Props) {
  const { color, fontWeight, borderRadius, queryName, queryCode } = btnProps;
  const { label, iconBtn, background, onClick, errorMsg } = btnProps;
  const { className, style, children, onQueryClick } = btnProps;

  return (
    <button
      type="button"
      onClick={() => {
        if (onClick) onClick();
        if (onQueryClick && queryName && label && queryCode)
          onQueryClick(queryName, queryCode);
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

export default memo(Button);
