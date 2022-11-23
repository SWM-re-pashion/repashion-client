import { memo } from 'react';

import classnames from 'classnames';
import ProductItem from 'src/components/Shop/molecules/ProductItem';
import ShopSkeleton from 'src/components/Shop/Organisms/ProductItemList/Skeleton';

import RecommendItem from './RecommendItem.view';
import $ from './style.module.scss';

type Props = {
  isFetching: boolean;
  intersectRef: React.RefObject<HTMLDivElement>;
  noProducts: React.ReactNode;
  isRecommend: boolean;
  itemList?: (res.ProductSummary | res.RecommendProduct)[];
};

const isRecommendProduct = (
  item: res.ProductSummary | res.RecommendProduct,
): item is res.RecommendProduct => {
  return 'product' in item;
};

function ProductListView(viewProps: Props) {
  const { isFetching, itemList, intersectRef, noProducts, isRecommend } =
    viewProps;
  // TODO: 윈도우 사이즈에 따라 스켈레톤 아이템 개수 다르게 하기

  return (
    <>
      {itemList && (
        <article
          className={classnames($['product-list'], {
            [$['recommend-list']]: isRecommend,
          })}
        >
          {itemList.map((item) => {
            if (isRecommendProduct(item)) {
              return <RecommendItem key={item.id} {...{ item }} />;
            }
            return <ProductItem key={item.id} {...item} />;
          })}
        </article>
      )}
      {noProducts}
      <div ref={intersectRef} />
      {isFetching && <ShopSkeleton itemNum={12} {...{ isRecommend }} />}
    </>
  );
}

export default memo(ProductListView);
