import { ReactNode } from 'react';

import classnames from 'classnames';

import $ from './style.module.scss';

interface Props {
  noPadding?: boolean;
  children: ReactNode;
  decreaseHeight?: number;
}

export default function PageLayout(layoutProps: Props) {
  const { noPadding } = layoutProps;
  const { children } = layoutProps;
  const { decreaseHeight = 0 } = layoutProps;

  return (
    <main
      className={classnames($.layout, { [$['no-padding']]: noPadding })}
      style={{
        paddingBottom: `${noPadding ? 0 : 30 + decreaseHeight}px`,
      }}
    >
      {children}
    </main>
  );
}
