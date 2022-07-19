import { memo } from 'react';

import type { StyleProps } from '#types/props';
import { Check } from '@atoms/icon';
import classnames from 'classnames';
import { UserInfo } from 'types/info';

import $ from './style.module.scss';

type Props = {
  label: string;
  type?: keyof UserInfo;
  isSelected: boolean;
  handleClick?: (type: keyof UserInfo, value: string) => void;
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

export default memo(ButtonSelect);
