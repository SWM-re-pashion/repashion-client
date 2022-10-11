import { MeasureType } from '#types/storeType/upload';
import { measuresData } from '@constants/style';

export const getJudgeCategory = (kind: string | string[]): MeasureType => {
  if (kind.includes('skirt')) return 'skirt';
  if (kind.includes('onepiece')) return 'onepiece';
  if (kind.includes('bottom')) return 'bottom';
  return 'top';
};

export const getMeasureElement = (category: MeasureType) => {
  let filterCondition: (measure: string) => boolean;

  if (category === 'skirt') {
    filterCondition = (measure: string) =>
      measure === 'length' ||
      measure === 'waistSection' ||
      measure === 'bottomSection';
  } else if (category === 'onepiece') {
    filterCondition = (measure: string) =>
      measure === 'length' ||
      measure === 'shoulderWidth' ||
      measure === 'chestSection' ||
      measure === 'sleeveLength';
  } else if (category === 'bottom') {
    filterCondition = (measure: string) =>
      measure === 'length' ||
      measure === 'waistSection' ||
      measure === 'thighSection' ||
      measure === 'rise' ||
      measure === 'bottomSection';
  } else {
    filterCondition = (measure: string) =>
      measure === 'length' ||
      measure === 'shoulderWidth' ||
      measure === 'chestSection' ||
      measure === 'sleeveLength';
  }

  return measuresData.filter(({ code }) => filterCondition(code));
};
