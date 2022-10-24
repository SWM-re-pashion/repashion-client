export type ImgBasicProps = {
  id?: number;
  src: string;
};

export type ImgProps = {
  alt?: string;
  width?: number;
  height?: number;
} & ImgBasicProps;

export type DefaultData = {
  id?: string;
  onClick?: () => void;
  name: string;
  code: string;
};

export type UrlQuery = string | string[] | undefined;

export type RouterFunc = 'REPLACE' | 'PUSH' | 'BACK';
