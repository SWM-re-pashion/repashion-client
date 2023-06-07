import { FilterType } from '#types/storeType/filter';
import { RECOMMEND_CATEGORY, ALL_CATEGORY } from '@constants/category';

export const judgeCategoryId = (id: string) => {
  const isGender = id.length === 1;
  const isMain = id.length === 4;

  if (isMain && (id.endsWith(ALL_CATEGORY) || id.endsWith(RECOMMEND_CATEGORY)))
    return id[0];
  if (isGender || isMain) return id;
  return id.slice(0, 4);
};

export const judgeMainCategory = (category: string): FilterType => {
  const isInclude = (str: string) => category.includes(str);
  if (isInclude('상의') || isInclude('아우터') || isInclude('원피스'))
    return 'top';
  if (isInclude('하의')) return 'bottom';
  return 'all';
};

export const isRootCategory = (categoryQuery: string) =>
  categoryQuery.slice(-3) === ALL_CATEGORY || categoryQuery.length === 4;
