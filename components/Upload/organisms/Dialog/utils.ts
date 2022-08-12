import { deepClone, mergeObjInArr } from 'utils';

export const findChildren = (
  category: data.CategoryTree['children'],
  code: string,
) => category.find((children) => children.code === code)?.children;

export const filteredCategory = (code: string, category: data.CategoryTree) => {
  const commonData = findChildren(category.children, 'common');
  if (code === 'common' || !code) return commonData;
  const genderData = findChildren(category.children, code);
  const mergedCategory = deepClone(
    mergeObjInArr(commonData, genderData, 'name', 'children'),
  );
  return mergedCategory;
};

export const categoryProperty = (idx: number) => {
  if (idx === 0) return { name: '성별', code: 'gender' };
  if (idx === 1) return { name: '메인 카테고리', code: 'mainCategory' };
  if (idx === 2) return { name: '서브 카테고리', code: 'subCategory' };
  return { name: '', code: '' };
};
