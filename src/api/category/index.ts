import { BasicInfo } from '#types/storeType/upload';
import { Axios } from 'src/api/core';
import { getJudgeCategory } from 'src/utils';

export const getSelectedCategory = async (
  isExcluded: boolean,
): Promise<res.CategoryTree> => {
  const response = await Axios.get(
    `/api/category/v3${isExcluded ? '/exclude' : ''}`,
  );
  return response;
};

export const getCategoryTree = (
  data: res.CategoryTree['data'] | res.CategoryTreeChildren,
  categoryId: string,
): res.CategoryTree['data']['children'] => {
  const candidateTree = data?.children?.find((category) =>
    categoryId.startsWith(category.id),
  );
  if (candidateTree?.children) {
    const category = getCategoryTree(candidateTree, categoryId);
    if (category.length) return category;
    return [];
  }
  if (!candidateTree) return data.children || [];
  return [];
};

export const getBreadcrumb = (
  data: res.CategoryTree['data'] | res.CategoryTreeChildren | undefined,
  categoryId: string,
  breadCrumb?: string,
): string | undefined => {
  const candidateTree = data?.children?.find((category) =>
    categoryId.startsWith(category.id),
  );

  const name = candidateTree?.name;
  if (!name) return breadCrumb;
  const breadcrumb = `${breadCrumb ? `${breadCrumb} > ` : ''}${name}`;

  return getBreadcrumb(candidateTree, categoryId, breadcrumb);
};

export const getCategoryIds = (
  data: res.CategoryTree['data'] | res.CategoryTreeChildren | undefined,
  categoryName: string[],
  categoryIds?: string[],
): string[] => {
  const candidateTree = data?.children?.find(
    (category) => categoryName[0] === category.name,
  );
  if (!candidateTree) return categoryIds || ['', '', ''];
  let candidateIds: string[];
  if (categoryIds) candidateIds = [...categoryIds, candidateTree.id];
  else candidateIds = [candidateTree.id];
  return getCategoryIds(candidateTree, categoryName.slice(1), candidateIds);
};

export const getMainCategory = (
  data: res.CategoryTree['data'] | res.CategoryTreeChildren,
  category: BasicInfo['category'],
) => {
  const [gender, main, sub] = category;
  const breadCrumb = getBreadcrumb(data, sub || main || gender) || '';
  return getJudgeCategory(breadCrumb);
};
