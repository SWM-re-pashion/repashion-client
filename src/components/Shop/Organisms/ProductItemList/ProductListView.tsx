import { memo } from 'react';

import ShopSkeleton from '@templates/Skeleton/shop';
import ProductItem from 'src/components/Shop/molecules/ProductItem';

import $ from './style.module.scss';

type Props = {
  isFetching: boolean;
  intersectRef: React.RefObject<HTMLDivElement>;
  itemList?: res.ProductSummary[];
  noProducts: React.ReactNode;
};

function ProductListView(viewProps: Props) {
  const { isFetching, itemList, intersectRef, noProducts } = viewProps;
  // TODO: 윈도우 사이즈에 따라 스켈레톤 아이템 개수 다르게 하기
  return (
    <>
      {itemList && (
        <article className={$['product-list']}>
          {itemList.map((item) => (
            <ProductItem key={item.id} {...item} />
          ))}
        </article>
      )}
      {noProducts}
      <div ref={intersectRef} />
      {isFetching && <ShopSkeleton itemNum={12} />}
    </>
  );
}

export default memo(ProductListView);
