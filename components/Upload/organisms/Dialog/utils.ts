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

export const dialogCategoryProps = (idx: number) => {
  const candidateName = `${idx === 1 ? '메인' : '서브'} 카테고리`;
  const name = idx === 0 ? '성별' : candidateName;
  const candidateCode = `${idx === 1 ? 'main' : 'sub'} category`;
  const code = idx === 0 ? 'gender' : candidateCode;

  return {
    name,
    code,
  };
};
