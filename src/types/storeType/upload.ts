import { ImgBasicProps } from '..';

export type ValidationKey =
  | 'imgList'
  | 'style'
  | 'price'
  | 'basicInfo'
  | 'sellerNote'
  | 'size'
  | 'contact';

export type UploadValidation = {
  [key in ValidationKey]: boolean;
};

export interface ImgList {
  id: number;
  src: string;
}
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
  [index: string]: number | undefined; // Todo: 없애기 TextInput에서 처리하도록
  length?: number;
  shoulderWidth?: number;
  chestSection?: number;
  sleeveLength?: number;
  waistSection?: number;
  thighSection?: number;
  rise?: number;
  bottomSection?: number;
}

export interface AdditionalInfo {
  purchaseTime: string;
  purchasePlace: string;
}

export type MeasureType = 'top' | 'bottom' | 'onepiece' | 'skirt';

export interface UploadState {
  validation: UploadValidation;
  imgList: ImgList[];
  contact: string;
  style: StyleUpload;
  price: number;
  isIncludeDelivery: boolean;
  basicInfo: BasicInfo;
  size: string;
  sellerNote: SellerNote;
  measure: Measure;
  measureType: MeasureType;
  additionalInfo: AdditionalInfo;
  opinion: string;
}

type StateValue = string | number | boolean;

type SubType =
  | keyof StyleUpload
  | keyof BasicInfo
  | keyof SellerNote
  | keyof Measure
  | keyof AdditionalInfo;

export type UpdateUpload = (
  value: StateValue,
  type: keyof UploadState,
  subType?: SubType,
  idx?: number,
) => void;

export type UpdateArr = (
  value: StateValue[],
  type: keyof UploadState,
  subType?: SubType,
) => void;

export interface UploadStoreState extends UploadState {
  getIsRemained: () => boolean;
  updateValidate: (type: ValidationKey, value: boolean) => void;
  imgUpload: (imgList: ({ id: number } & ImgBasicProps)[]) => void;
  removeImg: (removeId: number) => void;
  initState: (state: UploadState) => void;
  initMeasure: (measures: Measure) => void;
  clearMeasure: () => void;
  clearUpload: () => void;
  updateArr: UpdateArr;
  updateUpload: UpdateUpload;
}
