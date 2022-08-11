import { State } from 'zustand';

import { ImgBasicProps } from '..';

export interface StyleUpload {
  tag: string;
  color: string[];
  material: string;
}

export interface BasicInfo {
  title: string;
  currentCategoryIdx: number;
  category: [string, string, string];
  brand: string;
}

export interface UploadState extends State {
  imgList: { id: number; src: string }[];
  style: StyleUpload;
  price: number;
  isIncludeDelivery: boolean;
  basicInfo: BasicInfo;
  size: string;
}

export type UpdateUpload = (
  value: string | number | boolean,
  type: keyof UploadState,
  subType?: keyof StyleUpload | keyof BasicInfo,
  idx?: number,
) => void;

export interface UploadStoreState extends UploadState {
  imgUpload: (imgList: ({ id: number } & ImgBasicProps)[]) => void;
  removeImg: (removeId: number) => void;
  updateUpload: UpdateUpload;
}
