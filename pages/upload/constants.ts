import { colors } from '@constants/index';
import { styles } from '@constants/style';

const styleData = [
  {
    label: '스타일 태그 선택 (1개)',
    type: 'colors',
    datas: styles.slice(1),
    noCheckColor: true,
    childrenBox: true,
  },
  {
    label: '컬러 선택',
    type: 'fit',
    datas: colors,
    isColor: true,
    childrenBox: true,
  },
];
export { styleData };
