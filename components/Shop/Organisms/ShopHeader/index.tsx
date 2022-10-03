import { memo } from 'react';

import { orderData } from '@constants/category';
import CategoryBox from 'components/Shop/molecules/CategoryBox';
import HeaderTool from 'components/Shop/molecules/HeaderTool';
import SortBox from 'components/Shop/molecules/SortBox';
import { findCodeByProp } from 'components/Upload/organisms/Dialog/utils';
import { useQueryRouter } from 'hooks';

import $ from './style.module.scss';
import { isRootCategory } from './utils';

type Props = {
  genderQuery: string;
  mainQuery: string;
  subQuery?: string;
  orderQuery: string;
  hideSoldQuery: string;
  genderSelectMenu: res.CategoryTreeChildren[];
  mainSelectMenu: res.CategoryTreeChildren[];
  subSelectMenu: res.CategoryTreeChildren[];
  breadCrumb: string;
};

function ShopHeader(headerProps: Props) {
  const pushCtgr = useQueryRouter('category');
  const replaceCtgr = useQueryRouter('category', 'REPLACE');
  const queryOrder = useQueryRouter('order', 'REPLACE');
  const queryHideSold = useQueryRouter('hide_sold', 'REPLACE');
  const { orderQuery, hideSoldQuery } = headerProps;
  const { genderSelectMenu, mainSelectMenu, subSelectMenu } = headerProps;
  const { genderQuery, mainQuery, subQuery, breadCrumb } = headerProps;
  const isSeletedSub = !!subQuery;
  const categoryData = isSeletedSub ? subSelectMenu : mainSelectMenu;
  const selectedMenu = isSeletedSub ? subQuery : mainQuery;
  const mainCategory = findCodeByProp(mainSelectMenu, mainQuery, 'id');

  const queryCategory = isRootCategory(subQuery) ? pushCtgr : replaceCtgr;

  return (
    <header className={$.header}>
      <HeaderTool
        {...{ onClick: queryCategory, breadCrumb }}
        {...{ isSeletedSub, mainCategory }}
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
