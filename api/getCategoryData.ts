import { useQuery } from '@tanstack/react-query';
import { Axios } from 'lib/axios';

import {
  findChildrenByProp,
  findNameByProp,
} from '../components/Upload/organisms/Dialog/utils';

export const getCategoryData = async (): Promise<res.CategoryTree> => {
  const { data } = await Axios.get('/api/category/v3');
  return data;
};

export const useCategoryTree = () => {
  const response = useQuery(['category'], () => getCategoryData(), {
    suspense: true,
  });
  return response.data;
};

export const getCategoryTree = (
  data: res.CategoryTree['data'],
  value: string,
  prop: keyof res.CategoryTreeChildren,
) => {
  const isMain = data.name === '성별';
  const categoryProps = {
    name: `${isMain ? '메인' : '서브'} 카테고리`,
    code: `${isMain ? 'main' : 'sub'} Category`,
  };
  const breadCandidate = findNameByProp(data.children, value, prop);
  const children = findChildrenByProp(data.children, value, prop);
  return {
    ...categoryProps,
    nextBreadCrumb: `${breadCandidate} > `,
    curBreadCrumb: breadCandidate,
    parentId: value,
    children,
  };
};
