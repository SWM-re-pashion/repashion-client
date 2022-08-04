import { State } from 'zustand';

import { ImgBasicProps } from '..';

export interface UploadState extends State {
  imgList: { id: number; src: string }[];
  style: {
    tag: string;
    color: string[];
    material: string;
  };
}

export interface UploadStoreState extends UploadState {
  imgUpload: (imgList: ({ id: number } & ImgBasicProps)[]) => void;
  removeImg: (removeId: number) => void;
}
