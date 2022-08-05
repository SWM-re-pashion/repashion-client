import { DefaultData } from '#types/index';
import { btnTemplateBox } from '#types/info';
import { StyleUpload, UploadState } from '#types/storeType/upload';
import { colors } from '@constants/index';
import { styles } from '@constants/style';

type btnBox = btnTemplateBox<keyof UploadState, keyof StyleUpload> & {
  datas: (string | DefaultData)[];
  subType: keyof StyleUpload;
};

const styleData: btnBox[] = [
  {
    label: '스타일 태그 선택 (1개)',
    type: 'style',
    subType: 'tag',
    datas: styles.slice(1),
    noCheckColor: true,
    childrenBox: true,
  },
  {
    label: '컬러 선택',
    type: 'style',
    subType: 'color',
    datas: colors,
    isColor: true,
    childrenBox: true,
  },
];
export { styleData };
