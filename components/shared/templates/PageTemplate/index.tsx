import { ReactNode } from 'react';

import HeadMeta from '@atoms/HeadMeta';
import PageHeader from '@molecules/PageHeader';
import Footer from '@organisms/Footer';

import $ from './style.module.scss';

type Props = {
  metaTitle: string;
  metaUrl: string;
  title: string;
  isNeedFooter: boolean;
  left?: ReactNode;
  right?: ReactNode;
  children?: ReactNode;
  outsideChildren?: ReactNode;
  sidePadding?: string;
};

function PageTemplate(templateProps: Props) {
  const { metaTitle, metaUrl, title, left, right } = templateProps;
  const { children, outsideChildren, isNeedFooter, sidePadding } =
    templateProps;
  return (
    <>
      <HeadMeta title={metaTitle} url={metaUrl} />
      <PageHeader {...{ title, left, right }} />
      <section
        className={$['page-body']}
        style={{ paddingLeft: sidePadding, paddingRight: sidePadding }}
      >
        {children}
      </section>

      {outsideChildren}

      {isNeedFooter && <Footer />}
    </>
  );
}

export default PageTemplate;
