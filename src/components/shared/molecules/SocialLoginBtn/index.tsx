import Image from 'next/image';

import type { StyleProps } from '#types/props';
import Span from '@atoms/Span';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props = {
  onClick: () => void;
  Logo?: JSX.Element;
  text: string;
  backgroundColor: string;
  color?: string;
  borderRadius?: string;
  hasBtnPadding?: boolean;
  fontWeight?: number;
  src?: string;
  alt?: string;
} & StyleProps;

function SocialLoginBtn(loginBtnProps: Props) {
  const { className, style, onClick, color, Logo, fontWeight } = loginBtnProps;
  const { text, backgroundColor, borderRadius, hasBtnPadding, src, alt } =
    loginBtnProps;

  return (
    <button
      {...{ style }}
      style={{ ...{ backgroundColor, borderRadius } }}
      type="button"
      className={classnames(
        $['social-login'],
        { [$['has-btn-padding']]: hasBtnPadding },
        className,
      )}
      onClick={onClick}
    >
      {Logo}
      {src && alt && (
        <Image
          {...{ src, alt }}
          width={44}
          height={44}
          style={{ ...{ borderRadius } }}
        />
      )}
      <Span
        {...{ color }}
        fontWeight={fontWeight || 400}
        className={$['social-login-text']}
      >
        {text}
      </Span>
    </button>
  );
}
export default SocialLoginBtn;
