import { useState } from 'react';

import classnames from 'classnames';
import type { DefaultProps } from 'types/props';

import { Check } from '../../atoms/icon';
import $ from './style.module.scss';

type Props = {
  color?: string;
} & DefaultProps;

export default function ButtonSelect({
  className,
  style,
  children,
  color,
}: Props) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked((clicked) => !clicked);
  };

  return (
    <button
      type="button"
      className={classnames($['btn-select'], className, {
        [$.color]: color,
        [$.clicked]: isClicked && !color,
        [$['clicked-color']]: isClicked && color,
      })}
      style={{ ...style }}
      onClick={handleClick}
    >
      {color ? (
        <div className={$['color-box']} style={{ backgroundColor: color }}>
          {isClicked && <Check className={$.icon} />}
        </div>
      ) : (
        <Check className={$.icon} />
      )}
      <span>{children}</span>
    </button>
  );
}
