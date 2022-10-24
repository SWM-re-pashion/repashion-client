import type { DefaultProps } from '#types/props';
import Button from '@atoms/Button';
import FooterWrapper from '@molecules/FooterWrapper';
import classnames from 'classnames';

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
    <FooterWrapper
      className={classnames($['btn-footer'], className)}
      wrapperClassName={$['btn-box']}
      style={{ ...style, backgroundColor: background || '#fff' }}
      {...{ msg }}
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
    </FooterWrapper>
  );
}
