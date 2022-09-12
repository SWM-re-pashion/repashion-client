import { useQuery } from 'react-query';

import { allCategory, recommendCategory } from '@constants/category';
import { categoryData } from '@mocks/categoryData';
import { Axios } from 'lib/axios';

import {
  childrenIdGenerated,
  filteredCategory,
  findChildrenByProp,
  findCodeByProp,
  findNameByProp,
} from '../components/Upload/organisms/Dialog/utils';

export const getCategoryData = async (): Promise<res.CategoryTree> => {
  const { data } = await Axios.get('/api/category');
  return data;
};

export const useCategoryTree = () => {
  const response = useQuery('category', () => getCategoryData());
  // return response;
  return categoryData;
};

export const useMainCategoryTree = (parentId: string) => {
  // const categoryTree = useCategoryTree()?.data?.data;
  const categoryTree = useCategoryTree();
  const mainCategoryProps = { name: '메인 카테고리', code: 'mainCategory' };
  const breadCandidate = findNameByProp(categoryTree.children, parentId, 'id');
  const genderName = findCodeByProp(categoryTree.children, parentId, 'id');
  const childrenCandidate = filteredCategory(genderName, categoryTree);
  const children = [recommendCategory, allCategory, ...childrenCandidate];
  const generatedIdChildren = childrenIdGenerated(parentId, children);

  if (categoryTree) {
    return {
      ...mainCategoryProps,
      breadCrumb: `${breadCandidate} > `,
      parentId,
      children: generatedIdChildren,
    };
  }
  return { ...mainCategoryProps, breadCrumb: '>', parentId, children: [] };
};

export const useSubCategory = (
  parentId: string,
  prop: keyof res.CategoryTreeChildren,
) => {
  const genderId = parentId[0];
  const slicedId = parentId.slice(1, 4);
  const { children, breadCrumb } = useMainCategoryTree(genderId);
  const subCategoryProps = { name: '서브 카테고리', code: 'subCategory' };
  const isAllOrRecommend = slicedId === '000' || slicedId === '999';
  const breadCandidate = breadCrumb + findNameByProp(children, parentId, 'id');
  const childrenFilteredByProp = findChildrenByProp(children, parentId, prop);
  const childrenCandidate = !isAllOrRecommend
    ? [allCategory, ...childrenFilteredByProp]
    : childrenFilteredByProp;
  const generatedIdChildren = childrenIdGenerated(parentId, childrenCandidate);

  if (children.length)
    return {
      ...subCategoryProps,
      breadCrumb: breadCandidate,
      parentId,
      children: generatedIdChildren,
    };
  return {
    ...subCategoryProps,
    breadCrumb: '>',
    parentId,
    children: [],
  };
};
