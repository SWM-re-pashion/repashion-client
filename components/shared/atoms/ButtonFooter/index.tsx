import Button from '@atoms/Button';
import classnames from 'classnames';
import type { DefaultProps } from 'types/props';

import $ from './style.module.scss';

type Props = {
  background?: string;
  onClick?: () => void;
  LeftBtn?: JSX.Element;
  msg?: string;
} & DefaultProps;

export default function ButtonFooter(footerProps: Props) {
  const { className, style, LeftBtn, children, background, onClick, msg } =
    footerProps;
  return (
    <footer
      className={classnames($['btn-footer'], className)}
      style={{ ...style }}
    >
      <div className={$['btn-box']}>
        {LeftBtn}
        <Button
          errorMsg={msg}
          onClick={onClick}
          background={background}
          className={$.btn}
        >
          {children}
        </Button>
      </div>

      {msg && <span className={$['error-msg']}>{msg}</span>}
    </footer>
  );
}
