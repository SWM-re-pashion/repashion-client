import { State } from 'zustand';

import { ImgBasicProps } from '..';

export interface StyleUpload {
  tag: string;
  color: string[];
  material: string;
}

export interface BasicInfo {
  title: string;
  category: string;
  brand: string;
}

export interface UploadState extends State {
  imgList: { id: number; src: string }[];
  style: StyleUpload;
  size: string;
  basicInfo: BasicInfo;
}

export interface UploadStoreState extends UploadState {
  imgUpload: (imgList: ({ id: number } & ImgBasicProps)[]) => void;
  removeImg: (removeId: number) => void;
  updateUpload: (
    type: keyof UploadState,
    value: string,
    subType?: keyof StyleUpload,
  ) => void;
}
