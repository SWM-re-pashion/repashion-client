import { useRouter } from 'next/router';

import { memo, useCallback } from 'react';

import { orderData } from '@constants/category';
import CategoryBox from 'components/Shop/molecules/CategoryBox';
import HeaderTool from 'components/Shop/molecules/HeaderTool';
import SortBox from 'components/Shop/molecules/SortBox';

import $ from './style.module.scss';

type Props = {
  genderQuery: string;
  mainQuery: string;
  subQuery: string;
  orderQuery: string;
  hideSoldQuery: string;
  genderSelectMenu: res.CategoryTreeChildren[];
  mainSelectMenu: res.CategoryTreeChildren[];
  subSelectMenu: res.CategoryTreeChildren[];
  breadCrumb: string;
};

function ShopHeader(headerProps: Props) {
  const router = useRouter();
  const { orderQuery, hideSoldQuery } = headerProps;
  const { genderSelectMenu, mainSelectMenu, subSelectMenu } = headerProps;
  const { genderQuery, mainQuery, subQuery, breadCrumb } = headerProps;
  const isSeletedSub = subQuery !== '-1';
  const categoryData = isSeletedSub ? subSelectMenu : mainSelectMenu;
  const selectedMenu = isSeletedSub ? subQuery : mainQuery;

  const onClick = useCallback(
    (queryName: string, value: string) => {
      router.push(
        {
          query: { ...router.query, [queryName]: value },
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
        {...{ onClick, breadCrumb, isSeletedSub }}
        data={genderSelectMenu}
        selectedMenu={genderQuery}
      />
      <CategoryBox
        {...{ onClick, isSeletedSub, selectedMenu }}
        data={categoryData}
      />
      <SortBox
        {...{ onClick }}
        data={orderData}
        hideSold={hideSoldQuery}
        selectedMenu={orderQuery}
      />
    </header>
  );
}

export default memo(ShopHeader);
