import { ReactNode } from 'react';

import { StyleProps } from '#types/props';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props = {
  noPadding?: boolean;
  children: ReactNode;
} & StyleProps;

export default function PageLayout(layoutProps: Props) {
  const { noPadding } = layoutProps;
  const { children, className } = layoutProps;

  return (
    <main
      className={classnames($.layout, className, {
        [$['no-padding']]: noPadding,
      })}
    >
      {children}
    </main>
  );
}
