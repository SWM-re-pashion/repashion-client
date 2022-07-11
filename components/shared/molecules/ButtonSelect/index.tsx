import classnames from 'classnames';
import type { StyleProps } from 'types/props';

import { Check } from '../../atoms/icon';
import $ from './style.module.scss';

type Props = {
  label: string;
  isSelected: boolean;
  handleClick: (value: string) => void;
  color?: string;
} & StyleProps;

export default function ButtonSelect({
  className,
  style,
  label,
  isSelected,
  handleClick,
  color,
}: Props) {
  return (
    <button
      type="button"
      className={classnames($['btn-select'], className, {
        [$.color]: color,
        [$.clicked]: isSelected && !color,
        [$['clicked-color']]: isSelected && color,
      })}
      style={{ ...style }}
      onClick={() => handleClick(label)}
    >
      {color ? (
        <div className={$['color-box']} style={{ backgroundColor: color }}>
          {isSelected && <Check className={$.icon} />}
        </div>
      ) : (
        <Check className={$.icon} />
      )}
      <span>{label}</span>
    </button>
  );
}
