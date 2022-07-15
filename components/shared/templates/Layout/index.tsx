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

  useEffect(() => {
    window.document.body.style.overflow = 'hidden';

    return () => {
      window.document.body.style.overflow = 'visible';
    };
  }, []);

  return (
    <main
      className={$.layout}
      style={{
        maxHeight: `calc(100vh - ${
          headerHeight + footerHeight + decreaseHeight
        }px)`,
      }}
    >
      <div className={classnames($.body, { [$['no-padding']]: noPadding })}>
        {children}
      </div>
    </main>
  );
}
