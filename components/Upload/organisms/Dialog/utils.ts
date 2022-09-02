import { deepClone, mergeObjInArr } from 'utils';

export const findChildren = (
  category: res.CategoryTree['data']['children'],
  code: string,
) => category.find((children) => children.code === code)?.children || [];

export const findKorValue = (
  category: res.CategoryTree['data']['children'] | undefined,
  code: string,
) => category?.find((children) => children.code === code)?.name || '';

export const filteredCategory = (
  code: string,
  category: res.CategoryTree['data'],
) => {
  const commonData = findChildren(category.children, 'common');
  if (code === 'common' || !code) return commonData;
  const genderData = findChildren(category.children, code);
  const mergedCategory = deepClone(
    mergeObjInArr(commonData, genderData, 'name', 'children'),
  );
  return mergedCategory;
};

export const curCategoryChildren = (category: res.CategoryTreeChildren) =>
  category.children?.map(({ name, code }) => code) || [];

export const categoryNameCodeArr = (category: res.CategoryTreeChildren) => {
  const result = category.children?.map(({ name, code }) => ({
    name,
    code,
  }));
  return result?.length ? result : [{ name: '', code: '' }];
};
