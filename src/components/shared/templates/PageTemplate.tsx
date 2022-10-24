import { ReactNode } from 'react';

import HeadMeta from '@atoms/HeadMeta';
import PageHeader from '@molecules/PageHeader';
import Footer from '@organisms/Footer';

type Props = {
  metaTitle: string;
  metaUrl: string;
  title: string;
  isNeedFooter: boolean;
  left?: ReactNode;
  right?: ReactNode;
  children?: ReactNode;
  outsideChildren?: ReactNode;
  paddingTop?: string;
  sidePadding?: string;
  paddingBottom?: string;
};

function PageTemplate(templateProps: Props) {
  const { metaTitle, metaUrl, title, left, right } = templateProps;
  const { children, outsideChildren, isNeedFooter } = templateProps;
  const { paddingTop, sidePadding, paddingBottom } = templateProps;
  return (
    <>
      <HeadMeta title={metaTitle} url={metaUrl} />
      <PageHeader {...{ title, left, right }} />
      <section
        style={{
          paddingTop: paddingTop || '60px',
          paddingBottom: paddingBottom || '0',
          paddingLeft: sidePadding,
          paddingRight: sidePadding,
        }}
      >
        {children}
      </section>

      {outsideChildren}

      {isNeedFooter && <Footer />}
    </>
  );
}

export default PageTemplate;
