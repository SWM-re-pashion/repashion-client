import { ReactNode } from 'react';

import { StyleProps } from '#types/props';
import classnames from 'classnames';
import { useTabIndex } from 'src/store/useTabIndex';

import $ from './style.module.scss';

type Props = {
  noPadding?: boolean;
  children: ReactNode;
} & StyleProps;

export default function PageLayout(layoutProps: Props) {
  const { noPadding } = layoutProps;
  const { children, className, style } = layoutProps;
  const tabIndex = useTabIndex((state) => state.tabIndex);

  return (
    <main
      {...{ style, tabIndex }}
      className={classnames($.layout, className, {
        [$['no-padding']]: noPadding,
      })}
    >
      {children}
    </main>
  );
}
