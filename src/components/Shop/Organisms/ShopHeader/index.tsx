import { memo } from 'react';

import { orderData } from '@constants/category';
import CategoryBox from 'src/components/Shop/molecules/CategoryBox';
import HeaderTool from 'src/components/Shop/molecules/HeaderTool';
import SortBox from 'src/components/Shop/molecules/SortBox';
import { useQueryRouter } from 'src/hooks';
import { isRootCategory, judgeMainCategory } from 'src/utils/shop.utils';

import $ from './style.module.scss';

type Props = {
  genderQuery: string;
  categoryQuery: string;
  orderQuery: string;
  hideSoldQuery: string;
  genderSelectMenu: res.CategoryTreeChildren[];
  selectData: res.CategoryTreeChildren[];
  breadCrumb: string;
  isRecommend: boolean;
};

function ShopHeader(headerProps: Props) {
  const pushCtgr = useQueryRouter('category');
  const replaceCtgr = useQueryRouter('category', 'REPLACE');
  const queryOrder = useQueryRouter('order', 'REPLACE');
  const queryHideSold = useQueryRouter('hideSold', 'REPLACE');
  const { categoryQuery, orderQuery, hideSoldQuery } = headerProps;
  const { genderSelectMenu, selectData } = headerProps;
  const { genderQuery, breadCrumb, isRecommend } = headerProps;
  const isSelectedSub = categoryQuery.length === 7;
  const selectedMenu = categoryQuery;
  const mainCategory = judgeMainCategory(breadCrumb);

  const queryCategory = isRootCategory(categoryQuery) ? pushCtgr : replaceCtgr;

  return (
    <header className={$.header}>
      <HeaderTool
        {...{ onClick: queryCategory, breadCrumb }}
        {...{ isSelectedSub, mainCategory, isRecommend }}
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
