import { useState } from 'react';

import classnames from 'classnames';
import type { StyleProps } from 'types/props';

import { Check } from '../../atoms/icon';
import $ from './style.module.scss';

type Props = {
  label: string | number;
} & StyleProps;

export default function ButtonSelect({ className, style, label }: Props) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked((clicked) => !clicked);
  };

  return (
    <button
      type="button"
      className={classnames($['btn-select'], className, {
        [$.clicked]: isClicked,
      })}
      style={{ ...style }}
      onClick={handleClick}
    >
      <Check className={$.icon} />
      <span>{label}</span>
    </button>
  );
}
