import { State } from 'zustand';

import { ImgBasicProps } from '..';

export interface StyleUpload {
  tag: string;
  color: string[];
  material: string;
}

export interface BasicInfo {
  title: string;
  curCategoryIdx: number;
  category: [string, string, string];
  brand: string;
}

export interface SellerNote {
  condition: string;
  pollution: string;
  height: number;
  bodyShape: string;
  length: string;
  fit: string;
}

export interface Measure {
  [index: string]: number;
  length: number;
  shoulderWidth: number;
  chestSection: number;
  sleeveLength: number;
  waistSection: number;
  thighSection: number;
  rise: number;
  bottomSection: number;
}

export interface UploadState extends State {
  imgList: { id: number; src: string }[];
  style: StyleUpload;
  price: number;
  isIncludeDelivery: boolean;
  basicInfo: BasicInfo;
  size: string;
  sellerNote: SellerNote;
  measure: Measure;
}

export type UpdateUpload = (
  value: string | number | boolean,
  type: keyof UploadState,
  subType?:
    | keyof StyleUpload
    | keyof BasicInfo
    | keyof SellerNote
    | keyof Measure,
  idx?: number,
) => void;

export interface UploadStoreState extends UploadState {
  imgUpload: (imgList: ({ id: number } & ImgBasicProps)[]) => void;
  removeImg: (removeId: number) => void;
  updateUpload: UpdateUpload;
}
