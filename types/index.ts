export type ImgBasicProps = {
  id?: number;
  src: string;
};

export type ImgProps = {
  id?: number;
  src: string;
  alt?: string;
  width?: number;
  height?: number;
} & ImgBasicProps;

export type DefaultData = { name: string; code: string };
