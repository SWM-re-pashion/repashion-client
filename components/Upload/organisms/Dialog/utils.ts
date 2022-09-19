import { deepClone, mergeObjInArr } from 'utils';

export const findCodeByProp = (
  category: res.CategoryTree['data']['children'],
  value: string,
  prop: keyof res.CategoryTreeChildren,
) => category.find((children) => children[prop] === value)?.code || '';

export const findChildrenByProp = (
  category: res.CategoryTree['data']['children'] | undefined,
  value: string,
  prop: keyof res.CategoryTreeChildren,
) => category?.find((children) => children[prop] === value)?.children || [];

export const findNameByProp = (
  category: res.CategoryTree['data']['children'] | undefined,
  value: string,
  prop: keyof res.CategoryTreeChildren,
) => category?.find((children) => children[prop] === value)?.name || '';

// export const filteredCategory = (
//   code: string,
//   category: res.CategoryTree['data'],
// ) => {
//   const commonData = findChildrenByProp(category.children, 'common', 'code');
//   if (code === 'common' || !code) return commonData;
//   const genderData = findChildrenByProp(category.children, code, 'code');
//   const mergedCategory = deepClone(
//     mergeObjInArr(commonData, genderData, 'name', 'children'),
//   );
//   return mergedCategory;
// };

export const curCategoryChildrenByProp = (
  category: Omit<res.CategoryTreeChildren, 'id'>,
  prop: keyof Omit<res.CategoryTreeChildren, 'children'>,
) => category.children?.map((child) => child[prop]) || [];

export const categoryIdNameCodeArr = (
  category: Omit<res.CategoryTreeChildren, 'id'>,
) => {
  const result = category.children?.map(({ id, name, code }) => ({
    id,
    name,
    code,
  }));
  return result?.length ? result : [];
};
