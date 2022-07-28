import { memo } from 'react';

import type { StyleProps } from '#types/props';
import { Check } from '@atoms/icon';
import classnames from 'classnames';
import { ClothesCategory } from 'types/info';

import $ from './style.module.scss';

type Props<T> = {
  type?: T;
  label: string;
  subType?: keyof ClothesCategory;
  isSelected: boolean;
  handleClick?: (type: T, value: string) => void;
  color?: string;
} & StyleProps;

function ButtonSelect<T>(btnProps: Props<T>) {
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
        if (type && handleClick) handleClick(type, label);
      }}
      aria-label={`${label} 버튼`}
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
const typedMemo: <T>(c: T) => T = memo;
export default typedMemo(ButtonSelect);
