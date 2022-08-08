import { memo } from 'react';

import type { StyleProps } from '#types/props';
import { Check } from '@atoms/icon';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props<T, U> = {
  type?: T;
  subType?: U;
  label: string;
  data: string;
  isSelected: boolean;
  onClick?: (value: string, type: T, subType?: U) => void;
  color?: string;
  noCheckColor?: boolean;
} & StyleProps;

function ButtonSelect<T, U>(btnProps: Props<T, U>) {
  const { className, style } = btnProps;
  const { label, data, type, subType, isSelected, onClick } = btnProps;
  const { color, noCheckColor } = btnProps;

  return (
    <button
      type="button"
      className={classnames($['btn-select'], className, {
        [$.color]: color || noCheckColor,
        [$.clicked]: isSelected && !color,
        [$['clicked-color']]: isSelected && (color || noCheckColor),
      })}
      style={{ ...style }}
      onClick={() => {
        if (type && onClick) {
          if (subType) onClick(data, type, subType);
          else onClick(data, type);
        }
      }}
      aria-label={`${label} 버튼`}
    >
      {color && (
        <div
          className={classnames($['color-box'], {
            [$.white]: color === '#fff',
          })}
          style={{ backgroundColor: color }}
        >
          {isSelected && <Check className={$.icon} />}
        </div>
      )}
      {!color && !noCheckColor && <Check className={$.icon} />}
      <span className={classnames($.label, { [$['no-check']]: noCheckColor })}>
        {label}
      </span>
    </button>
  );
}
const typedMemo: <T>(c: T) => T = memo;
export default typedMemo(ButtonSelect);
