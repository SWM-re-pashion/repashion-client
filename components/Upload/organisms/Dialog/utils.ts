import { deepClone, mergeObjInArr } from 'utils';

export const findGender = (
  category: data.CategoryTree['children'],
  name: string,
) => category.find((gender) => gender.name === name);

export const filteredCategory = (
  category: data.CategoryTree,
  name: string,
  code: string,
) => {
  const genderData = findGender(category.children, name);
  const commonData = findGender(category.children, '공용');
  const mergedCategory = deepClone(
    mergeObjInArr(
      genderData?.children,
      commonData?.children,
      'name',
      'children',
    ),
  );
  return {
    name,
    code,
    children: mergedCategory,
  };
};
