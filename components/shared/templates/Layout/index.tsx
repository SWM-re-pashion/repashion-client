import { useEffect, ReactNode } from 'react';

import style from './style.module.scss';

interface Props {
  isNeedFooter?: boolean;
  children: ReactNode;
  headerHeight?: number;
  decreaseHeight?: number;
}

export default function PageLayout({
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
      className={style.layout}
      style={{
        maxHeight: `calc(100vh - ${
          headerHeight + footerHeight + decreaseHeight
        }px)`,
      }}
    >
      <div className={style.body}>{children}</div>
    </main>
  );
}
