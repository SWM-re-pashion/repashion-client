import { useQuery } from 'react-query';

import { Axios } from 'lib/axios';

import {
  filteredCategory,
  findChildren,
} from '../components/Upload/organisms/Dialog/utils';

export const getCategoryData = async (): Promise<res.CategoryTree> => {
  const { data } = await Axios.get('/api/category');
  return data;
};

export const useCategoryTree = () => {
  const response = useQuery('category', () => getCategoryData());
  return response;
};

export const useMainCategoryTree = (gender: string) => {
  const categoryTree = useCategoryTree()?.data?.data;
  const mainCategoryProps = { name: '메인 카테고리', code: 'mainCategory' };
  if (categoryTree)
    return {
      ...mainCategoryProps,
      children: filteredCategory(gender, categoryTree),
    };
  return { ...mainCategoryProps, children: [] };
};

export const useSubCategory = (gender: string, mainCategory: string) => {
  const mainCategoryTree = useMainCategoryTree(gender).children;
  const subCategoryProps = { name: '서브 카테고리', code: 'subCategory' };
  if (mainCategoryTree.length)
    return {
      ...subCategoryProps,
      children: findChildren(mainCategoryTree, mainCategory),
    };
  return { ...subCategoryProps, children: [] };
};
