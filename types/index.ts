export type ImgBasicProps = {
  id?: number;
  src: string;
};

export type ImgProps = {
  alt?: string;
  width?: number;
  height?: number;
} & ImgBasicProps;

export type DefaultData = { id?: string; name: string; code: string };

export type UrlQuery = string | string[] | undefined;
