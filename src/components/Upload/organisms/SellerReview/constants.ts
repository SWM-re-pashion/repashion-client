import { SellerNote, UploadState } from '#types/storeType/upload';

type Props = {
  label1?: string;
  label2?: string;
  label3?: string;
  hasHeight?: boolean;
  hasBodyShape?: boolean;
  name: string;
  type: keyof UploadState;
  subType: keyof SellerNote;
};

export const reviewProps: Props[] = [
  {
    label1: '사용감',
    name: '사용감 선택',
    type: 'sellerNote',
    subType: 'condition',
  },
  {
    label1: '하자 및 오염',
    name: '하자 및 오염 선택',
    type: 'sellerNote',
    subType: 'pollution',
  },
  {
    label1: '키',
    label2: '기준',
    label3: '기장감',
    hasHeight: true,
    name: '기장감 선택',
    type: 'sellerNote',
    subType: 'length',
  },
  {
    label2: '체형 기준',
    label3: '핏',
    hasBodyShape: true,
    name: '핏 선택',
    type: 'sellerNote',
    subType: 'fit',
  },
];
