import { ReactNode } from 'react';

import classnames from 'classnames';

import $ from './style.module.scss';

interface Props {
  padding?: string;
  noPadding?: boolean;
  isNeedFooter?: boolean;
  children: ReactNode;
  headerHeight?: number;
  decreaseHeight?: number;
}

export default function PageLayout(layoutProps: Props) {
  const { padding, noPadding } = layoutProps;
  const { isNeedFooter, children } = layoutProps;
  const { headerHeight = 0, decreaseHeight = 0 } = layoutProps;
  const footerHeight = isNeedFooter ? 55 : 0;

  return (
    <main className={$.layout}>
      <div
        className={classnames($.body, { [$['no-padding']]: noPadding })}
        style={{
          padding,
          marginTop: `${headerHeight}px`,
          paddingBottom: `${padding ? 30 : 0 + decreaseHeight}px`,
        }}
      >
        {children}
      </div>
    </main>
  );
}
