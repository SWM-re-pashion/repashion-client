export type ImgBasicProps = {
  id?: number;
  src: string;
};

export type ImgProps = {
  alt?: string;
  width?: number;
  height?: number;
} & ImgBasicProps;

export type DefaultData = { name: string; code: string };

export type QueryChange = (queryName: string, value: string) => void;
