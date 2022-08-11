import Button from '@atoms/Button';
import { RadioInner } from '@atoms/icon';
import Span from '@atoms/Span';
import classnames from 'classnames';
import { memo } from 'react';

import $ from './style.module.scss';

type Props<T, U> = {
  name: string;
  code: string;
  isBorder: boolean;
  isClicked?: boolean;
  type?: T;
  subType?: U;
  idx?: number;
  onSubTypeClick?: (value: string, type: T, subType: U, idx: number) => void;
  onTypeClick?: (value: string, type: T) => void;
  onClick?: (value: string) => void;
};

function RadioSelect<T, U>(radioProps: Props<T, U>) {
  const { name, code, isBorder, isClicked } = radioProps;
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
      onClick={() => handleClick(code)}
      className={classnames($['radio-select'], { [$.border]: isBorder })}
    >
      <Button
        iconBtn
        label="라디오 버튼"
        className={classnames($['radio-btn'], { [$.clicked]: isClicked })}
      >
        {isClicked && <RadioInner />}
      </Button>
      <Span fontWeight={400} className={$.name}>
        {name}
      </Span>
    </div>
  );
}

const typedMemo: <T>(c: T) => T = memo;
export default typedMemo(RadioSelect);
