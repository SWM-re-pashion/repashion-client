import { memo } from 'react';

import ButtonView, { ButtonProps } from './Button.view';

type Props<T> = {
  color?: string;
  fontWeight?: number;
  label?: string;
  background?: string;
  borderRadius?: string;
  onClick?: (value?: T) => void;
  value?: T;
} & ButtonProps;

function Button<T>(btnProps: Props<T>) {
  const { color, fontWeight, borderRadius, value, disabled } = btnProps;
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
        disabled,
      }}
    />
  );
}

const typedMemo: <T>(c: T) => T = memo;
export default typedMemo(Button);
