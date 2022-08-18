import { measures } from '@constants/style';

export const getJudgeCategory = (kind: string | string[]) => {
  if (kind.includes('skirt')) return 'skirt';
  if (kind.includes('onepiece')) return 'onepiece';
  if (kind.includes('bottom')) return 'bottom';
  return 'top';
};

export const getMeasureElement = (category: string | string[]) => {
  let filterCondition: (measure: string) => boolean;

  if (getJudgeCategory(category) === 'skirt') {
    filterCondition = (measure: string) =>
      measure === 'length' ||
      measure === 'waistSection' ||
      measure === 'bottomSection';
  } else if (getJudgeCategory(category) === 'onepiece') {
    filterCondition = (measure: string) =>
      measure === 'length' ||
      measure === 'shoulderWidth' ||
      measure === 'chestSection' ||
      measure === 'sleeveLength';
  } else if (getJudgeCategory(category) === 'bottom') {
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

  return measures.filter(({ code }) => filterCondition(code));
};
