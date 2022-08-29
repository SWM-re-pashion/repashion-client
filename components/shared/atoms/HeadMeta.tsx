import Head from 'next/head';

import { data } from 'constants/seo';

interface Props {
  title?: string;
  description?: string;
  url?: string;
  image: string;
  creator?: string;
}

function HeadMeta({ title, description, url, image, creator }: Props) {
  return (
    <Head>
      <title>{title ?? data.title}</title>
      <meta name="description" content={description ?? data.description} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <meta property="og:title" content={title ?? data.title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url ?? data.url} />
      <meta property="og:image" content={image} />
      <meta
        property="og:description"
        content={description ?? data.description}
      />

      <meta name="twitter:creator" content={creator ?? data.creator} />
      <meta name="twitter:title" content={title ?? data.title} />
      <meta name="twitter:image" content={image} />
      <meta
        name="twitter:description"
        content={description ?? data.description}
      />
    </Head>
  );
}

export default HeadMeta;
