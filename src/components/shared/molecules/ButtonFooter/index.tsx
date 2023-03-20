import type { DefaultProps } from '#types/props';
import Button from '@atoms/Button';
import { ButtonProps } from '@atoms/Button/Button.view';
import FooterWrapper from '@molecules/FooterWrapper';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props = {
  type?: ButtonProps['type'];
  btnColor?: string;
  background?: string;
  onClick?: () => void;
  LeftBtn?: JSX.Element;
  msg?: string;
  disabled?: boolean;
} & DefaultProps;

export default function ButtonFooter(footerProps: Props) {
  const { className, style, LeftBtn, children, type } = footerProps;
  const { btnColor, background, onClick, msg, disabled } = footerProps;
  return (
    <FooterWrapper
      className={classnames($['btn-footer'], className)}
      wrapperClassName={$['btn-box']}
      style={{ ...style, backgroundColor: background || '#fff' }}
      {...{ msg }}
    >
      {LeftBtn}
      <Button
        {...{ type, disabled }}
        background={btnColor}
        hasErrorMsg={!!msg}
        onClick={onClick}
        className={$.btn}
      >
        {children}
      </Button>
    </FooterWrapper>
  );
}
