import Button from '@atoms/Button';
import { RadioInner } from '@atoms/icon';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props<T> = {
  isClicked: boolean;
  onTypeClick?: (value: boolean, type: T) => void;
  onClick?: (value: boolean) => void;
  type?: T;
};

function RadioBtn<T>(radioProps: Props<T>) {
  const { isClicked, onTypeClick, onClick, type } = radioProps;
  return (
    <Button
      iconBtn
      label="라디오 버튼"
      className={classnames($['radio-btn'], { [$.clicked]: isClicked })}
      onClick={() => {
        if (type && onTypeClick) onTypeClick(!isClicked, type);
        else if (onClick) onClick(!isClicked);
      }}
    >
      {isClicked && <RadioInner />}
    </Button>
  );
}

export default RadioBtn;
