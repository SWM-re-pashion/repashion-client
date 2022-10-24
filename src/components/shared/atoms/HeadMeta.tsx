import Head from 'next/head';

import { seoData } from '@constants/seo';

interface Props {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  creator?: string;
}

function HeadMeta({ title, description, url, image, creator }: Props) {
  return (
    <Head>
      <title>{title ?? seoData.title}</title>
      <meta name="description" content={description ?? seoData.description} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <meta property="og:title" content={title ?? seoData.title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url ?? seoData.url} />
      <meta property="og:image" content={image ?? seoData.images.logo} />
      <meta
        property="og:description"
        content={description ?? seoData.description}
      />

      <meta name="twitter:creator" content={creator ?? seoData.creator} />
      <meta name="twitter:title" content={title ?? seoData.title} />
      <meta name="twitter:image" content={image} />
      <meta
        name="twitter:description"
        content={description ?? seoData.description}
      />
    </Head>
  );
}

export default HeadMeta;
