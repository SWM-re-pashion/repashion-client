import { useEffect, ReactNode } from 'react';

import classnames from 'classnames';

import $ from './style.module.scss';

interface Props {
  noPadding?: boolean;
  isNeedFooter?: boolean;
  children: ReactNode;
  headerHeight?: number;
  decreaseHeight?: number;
}

export default function PageLayout({
  noPadding,
  isNeedFooter,
  children,
  headerHeight = 0,
  decreaseHeight = 0,
}: Props) {
  const footerHeight = isNeedFooter ? 55 : 0;

  return (
    <main className={$.layout}>
      <div
        className={classnames($.body, { [$['no-padding']]: noPadding })}
        style={{
          marginTop: `${headerHeight}px`,
          paddingBottom: `${30 + decreaseHeight}px`,
        }}
      >
        {children}
      </div>
    </main>
  );
}
