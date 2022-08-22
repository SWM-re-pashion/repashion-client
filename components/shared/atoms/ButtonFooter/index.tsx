import classnames from 'classnames';

import Button from '@atoms/Button';
import type { DefaultProps } from 'types/props';

import $ from './style.module.scss';

type Props = {
  btnColor?: string;
  background?: string;
  onClick?: () => void;
  LeftBtn?: JSX.Element;
  msg?: string;
} & DefaultProps;

export default function ButtonFooter(footerProps: Props) {
  const { className, style, LeftBtn, children } = footerProps;
  const { btnColor, background, onClick, msg } = footerProps;
  return (
    <footer className={classnames($['btn-footer'], className)}>
      <div
        className={$['btn-box']}
        style={{ ...style, backgroundColor: background }}
      >
        {LeftBtn}
        <Button
          background={btnColor}
          errorMsg={msg}
          onClick={onClick}
          className={$.btn}
        >
          {children}
        </Button>
      </div>

      {msg && <span className={$['error-msg']}>{msg}</span>}
    </footer>
  );
}
