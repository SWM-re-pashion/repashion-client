import { Measure, MeasureType } from '#types/storeType/upload';
import { measuresData } from '@constants/style';

export const getJudgeCategory = (kind: string | string[]): MeasureType => {
  if (kind.includes('스커트')) return 'skirt';
  if (kind.includes('원피스')) return 'onepiece';
  if (kind.includes('하의')) return 'bottom';
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
  const measureData = measuresData.filter(({ code }) => filterCondition(code));
  const measureState: Measure = measureData.reduce((acc, { code }) => {
    return {
      ...acc,
      [code]: 0,
    };
  }, {});

  return { measureData, measureState };
};
