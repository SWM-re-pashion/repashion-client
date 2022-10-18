import { memo } from 'react';

import { orderData } from '@constants/category';
import CategoryBox from 'components/Shop/molecules/CategoryBox';
import HeaderTool from 'components/Shop/molecules/HeaderTool';
import SortBox from 'components/Shop/molecules/SortBox';
import { useQueryRouter } from 'hooks';
import { isRootCategory, judgeMainCategory } from 'utils/shop.utils';

import $ from './style.module.scss';

type Props = {
  genderQuery: string;
  categoryQuery: string;
  orderQuery: string;
  hideSoldQuery: string;
  genderSelectMenu: res.CategoryTreeChildren[];
  selectData: res.CategoryTreeChildren[];
  breadCrumb: string;
};

function ShopHeader(headerProps: Props) {
  const pushCtgr = useQueryRouter('category');
  const replaceCtgr = useQueryRouter('category', 'REPLACE');
  const queryOrder = useQueryRouter('order', 'REPLACE');
  const queryHideSold = useQueryRouter('hide_sold', 'REPLACE');
  const { categoryQuery, orderQuery, hideSoldQuery } = headerProps;
  const { genderSelectMenu, selectData } = headerProps;
  const { genderQuery, breadCrumb } = headerProps;
  const isSelectedSub = categoryQuery.length === 7;
  const selectedMenu = categoryQuery;
  const mainCategory = judgeMainCategory(breadCrumb);

  const queryCategory = isRootCategory(categoryQuery) ? pushCtgr : replaceCtgr;

  return (
    <header className={$.header}>
      <HeaderTool
        {...{ onClick: queryCategory, breadCrumb }}
        {...{ isSelectedSub, mainCategory }}
        data={genderSelectMenu}
        selectedMenu={genderQuery}
      />
      <CategoryBox
        {...{ onClick: queryCategory, isSelectedSub, selectedMenu }} // TODO: 렌더링 최적화
        data={selectData}
      />
      <SortBox
        {...{ onSoldClick: queryHideSold, onOrderClick: queryOrder }} // TODO: 렌더링 최적화
        data={orderData}
        hideSold={hideSoldQuery}
        selectedMenu={orderQuery}
      />
    </header>
  );
}

export default memo(ShopHeader);
