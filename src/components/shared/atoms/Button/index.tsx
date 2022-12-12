import { memo } from 'react';

import type { DefaultProps } from '#types/props';

import ButtonView from './Button.view';

type Props<T> = {
  color?: string;
  fontWeight?: number;
  label?: string;
  iconBtn?: boolean;
  background?: string;
  borderRadius?: string;
  onClick?: (value?: T) => void;
  value?: T;
  hasErrorMsg?: boolean;
} & DefaultProps;

function Button<T>(btnProps: Props<T>) {
  const { color, fontWeight, borderRadius, value } = btnProps;
  const { label, iconBtn, background, onClick, hasErrorMsg } = btnProps;
  const { className, style, children } = btnProps;
  const ariaLabel = label || `${children}`;
  const customStyle = {
    ...style,
    color,
    fontWeight,
    backgroundColor: background,
    borderRadius,
  };
  const handleClick = () => {
    if (onClick && value === undefined) onClick();
    else if (onClick && label && value) onClick(value);
  };

  return (
    <ButtonView
      {...{
        handleClick: onClick ? handleClick : undefined,
        customStyle,
        className,
        iconBtn,
        hasErrorMsg,
        ariaLabel,
        children,
      }}
    />
  );
}

const typedMemo: <T>(c: T) => T = memo;
export default typedMemo(Button);
