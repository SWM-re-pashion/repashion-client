import { ReactNode } from 'react';

import classnames from 'classnames';

import $ from './style.module.scss';

interface Props {
  padding?: string;
  noPadding?: boolean;
  children: ReactNode;
  headerHeight?: number;
  decreaseHeight?: number;
}

export default function PageLayout(layoutProps: Props) {
  const { padding, noPadding } = layoutProps;
  const { children } = layoutProps;
  const { headerHeight = 0, decreaseHeight = 0 } = layoutProps;

  return (
    <main
      className={classnames($.layout, { [$['no-padding']]: noPadding })}
      style={{
        paddingTop: `${headerHeight}px`,
        paddingBottom: `${padding ? 0 : 30 + decreaseHeight}px`,
        padding,
      }}
    >
      {children}
    </main>
  );
}
