import { memo } from 'react';

import classnames from 'classnames';
import type { StyleProps } from 'types/props';

import { Check } from '../../atoms/icon';
import $ from './style.module.scss';

type Props = {
  label: string;
  type?: string;
  isSelected: boolean;
  handleClick: (type: string, value: string) => void;
  color?: string;
} & StyleProps;

function ButtonSelect(btnProps: Props) {
  const { className, style, label, type, isSelected, handleClick, color } =
    btnProps;

  return (
    <button
      type="button"
      className={classnames($['btn-select'], className, {
        [$.color]: color,
        [$.clicked]: isSelected && !color,
        [$['clicked-color']]: isSelected && color,
      })}
      style={{ ...style }}
      onClick={() => {
        if (type) handleClick(type, label);
      }}
    >
      {color ? (
        <div
          className={classnames($['color-box'], {
            [$.white]: color === '#fff',
          })}
          style={{ backgroundColor: color }}
        >
          {isSelected && <Check className={$.icon} />}
        </div>
      ) : (
        <Check className={$.icon} />
      )}
      <span>{label}</span>
    </button>
  );
}

export default memo(ButtonSelect);
