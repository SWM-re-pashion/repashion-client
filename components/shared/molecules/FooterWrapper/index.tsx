import classnames from 'classnames';
import type { DefaultProps } from 'types/props';

import $ from './style.module.scss';

type Props = {
  msg?: string;
  wrapperClassName?: string;
} & DefaultProps;

export default function FooterWrapper(footerProps: Props) {
  const { className, style, children, msg, wrapperClassName } = footerProps;

  return (
    <footer className={classnames($.footer, className)}>
      <div
        className={classnames($['footer-wrapper'], wrapperClassName)}
        {...{ style }}
      >
        {children}
      </div>
      {msg && <span className={$['error-msg']}>{msg}</span>}
    </footer>
  );
}
