/* eslint-disable no-unsafe-optional-chaining */
import { useRouter } from 'next/router';

import { useCallback, useEffect } from 'react';

import { sortData } from '@constants/index';
import { useMainCategoryTree, useSubCategory } from 'api/getCategoryData';
import CategoryBox from 'components/Shop/molecules/CategoryBox';
import HeaderTool from 'components/Shop/molecules/HeaderTool';
import SortBox from 'components/Shop/molecules/SortBox';
import {
  categoryIdNameCodeArr,
  curCategoryChildrenByProp,
  findCodeByProp,
} from 'components/Upload/organisms/Dialog/utils';

import $ from './style.module.scss';

type Props = {
  data: res.CategoryTree['data'];
  gender: string;
  main: string;
  sub: string;
  sort: string;
  hideSold: string;
};

function ShopHeader(headerProps: Props) {
  const router = useRouter();
  const { data, gender, main, sub, sort, hideSold } = headerProps;

  const genderSelectMenu = data && categoryIdNameCodeArr(data);
  const genderQuery = (gender as string) || genderSelectMenu[0].id || '0';
  const genderName = findCodeByProp(genderSelectMenu, genderQuery, 'id');

  const mainCategory = useMainCategoryTree(genderName); // TODO: 2번 렌더링됨
  const mainSelectMenu = categoryIdNameCodeArr(mainCategory);
  const isIncludeMain = curCategoryChildrenByProp(mainCategory, 'id').includes(
    main as string,
  );
  const mainQuery = isIncludeMain
    ? (main as string)
    : mainSelectMenu[0].id || '0';

  const subCategory = useSubCategory(genderName, mainQuery, 'id');
  const subSelectMenu = categoryIdNameCodeArr(subCategory);
  const isIncludeSub = curCategoryChildrenByProp(subCategory, 'id').includes(
    sub as string,
  );
  const subQuery = isIncludeSub ? (sub as string) : subSelectMenu[0].id || '0';

  const sortQuery = (sort as string) || sortData[0].code;
  const soldQuery = (hideSold as string) || 'true';

  // useEffect(() => {
  //   if (router.isReady) console.log(gender, main, sub, sort, hideSold);
  // }, [gender, hideSold, main, sort, sub, router.isReady]);

  // useEffect(() => {
  //   console.log(subSelectMenu);
  // }, [subSelectMenu]);

  const onClick = useCallback(
    (queryName: string, value: string) => {
      let toBeQuery = {};
      if (queryName === 'gender') {
        toBeQuery = { gender: value, main: '1' };
      } else if (queryName === 'main') {
        if (value === '1')
          toBeQuery = { gender: router.query.gender, main: value };
        else toBeQuery = { gender: router.query.gender, main: value, sub: '1' };
      } else if (queryName === 'sub') {
        toBeQuery = { sub: value };
      } else {
        toBeQuery = { [queryName]: value };
      }
      router.push(
        {
          query: { ...router.query, ...toBeQuery },
        },
        undefined,
        { shallow: true },
      );
    },
    [router],
  );

  return (
    <header className={$.header}>
      <HeaderTool
        {...{ onClick }}
        data={genderSelectMenu}
        selectedMenu={genderQuery}
      />
      <CategoryBox
        {...{ onClick }}
        data={mainSelectMenu}
        selectedMenu={mainQuery}
        isMain
      />
      <CategoryBox
        {...{ onClick }}
        data={subSelectMenu}
        selectedMenu={subQuery}
        isMain={false}
      />
      <SortBox
        {...{ onClick }}
        data={sortData}
        hideSold={soldQuery}
        selectedMenu={sortQuery}
      />
    </header>
  );
}

export default ShopHeader;
