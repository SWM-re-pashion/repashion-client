import { memo } from 'react';

import { orderData } from '@constants/category';
import CategoryBox from 'components/Shop/molecules/CategoryBox';
import HeaderTool from 'components/Shop/molecules/HeaderTool';
import SortBox from 'components/Shop/molecules/SortBox';
import { useQueryRouter } from 'hooks';

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
  const queryCategory = useQueryRouter('category');
  const queryOrder = useQueryRouter('order');
  const queryHideSold = useQueryRouter('hideSold');
  const { orderQuery, hideSoldQuery } = headerProps;
  const { genderSelectMenu, mainSelectMenu, subSelectMenu } = headerProps;
  const { genderQuery, mainQuery, subQuery, breadCrumb } = headerProps;
  const isSeletedSub = subQuery !== '-1';
  const categoryData = isSeletedSub ? subSelectMenu : mainSelectMenu;
  const selectedMenu = isSeletedSub ? subQuery : mainQuery;

  return (
    <header className={$.header}>
      <HeaderTool
        {...{ onClick: queryCategory, breadCrumb, isSeletedSub }}
        data={genderSelectMenu}
        selectedMenu={genderQuery}
      />
      <CategoryBox
        {...{ onClick: queryCategory, isSeletedSub, selectedMenu }}
        data={categoryData}
      />
      <SortBox
        {...{ onSoldClick: queryHideSold, onOrderClick: queryOrder }}
        data={orderData}
        hideSold={hideSoldQuery}
        selectedMenu={orderQuery}
      />
    </header>
  );
}

export default memo(ShopHeader);
