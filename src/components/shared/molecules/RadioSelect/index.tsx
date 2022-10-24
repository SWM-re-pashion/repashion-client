import { memo } from 'react';

import Span from '@atoms/Span';
import RadioBtn from '@molecules/RadioBtn';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props<T, U> = {
  name: string;
  selectedValue: string;
  isClicked: boolean;
  isBorder?: boolean;
  type?: T;
  subType?: U;
  idx?: number;
  onSubTypeClick?: (value: string, type: T, subType: U, idx: number) => void;
  onTypeClick?: (value: string, type: T) => void;
  onClick?: (value: string) => void;
};

function RadioSelect<T, U>(radioProps: Props<T, U>) {
  const { name, selectedValue, isBorder, isClicked } = radioProps;
  const { onSubTypeClick, onTypeClick, onClick, type, subType, idx } =
    radioProps;

  const handleClick = (value: string) => {
    if (type && subType && onSubTypeClick && idx !== undefined) {
      onSubTypeClick(value, type, subType, idx);
    } else if (type && onTypeClick) onTypeClick(value, type);
    else if (onClick) onClick(value);
  };

  return (
    <div
      className={classnames($['radio-select'], { [$.border]: isBorder })}
      role="button"
      tabIndex={0}
      onClick={() => handleClick(selectedValue)}
      onKeyDown={() => handleClick(selectedValue)}
    >
      <RadioBtn {...{ isClicked }} />
      <Span fontWeight={400} className={$.name}>
        {name}
      </Span>
    </div>
  );
}

const typedMemo: <T>(c: T) => T = memo;
export default typedMemo(RadioSelect);
