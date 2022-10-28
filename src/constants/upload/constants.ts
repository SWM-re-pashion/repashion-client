import { btnTemplateBox } from '#types/info';
import { UploadState, AdditionalInfo } from '#types/storeType/upload';

type btnBox = btnTemplateBox<keyof UploadState, keyof AdditionalInfo> & {
  placeholder: string;
  subType: keyof AdditionalInfo;
};

export const additionData: btnBox[] = [
  {
    label: '구매시기',
    placeholder: '한달 전, 1년 이내 등',
    type: 'additionalInfo',
    subType: 'purchaseTime',
  },
  {
    label: '구매처',
    placeholder: '백화점, 온라인 쇼핑몰 등',
    type: 'additionalInfo',
    subType: 'purchasePlace',
  },
];
