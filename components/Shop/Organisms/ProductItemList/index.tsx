import { memo, useEffect, useRef, useState } from 'react';

import ErrorFallback from '@atoms/ErrorFallback';
import Loading from '@atoms/Loading';
import AsyncBoundary from '@templates/AsyncBoundary';
import PullToRefresh from '@templates/PullToRefresh';
import ShopSkeleton from '@templates/Skeleton/shop';
import { useMounted } from 'hooks';

import ProductItemListMain, {
  ProductItemListRefresh,
} from './ProductItemListMain';
import ProductListWrapperView from './ProductListWrapperView';

type Props = {
  queryStringObj?: Omit<req.ShopFeed, 'page' | 'size'>;
  paddingTop?: string;
  paddingBottom?: string;
  needPullToRefresh?: boolean;
};

function ProductItemList(listProps: Props) {
  const { paddingTop, paddingBottom, needPullToRefresh, queryStringObj } =
    listProps;
  const productListRef = useRef<ProductItemListRefresh>(null);
  const [isPossiblePullToRefresh, setPossiblePullToRefresh] = useState(false);
  const isMounted = useMounted();

  useEffect(() => {
    if (isMounted) setPossiblePullToRefresh(true);
  }, [isMounted]);

  const handleRefresh = productListRef.current?.onRefresh;

  const refreshingContent = <Loading />;

  const pullDownThreshold = 60;
  const maxPullDownDistance = 90;

  const commonProducts = (
    <AsyncBoundary
      suspenseFallback={<ShopSkeleton itemNum={12} />}
      errorFallback={ErrorFallback}
    >
      {needPullToRefresh ? (
        <ProductItemListMain ref={productListRef} {...{ queryStringObj }} />
      ) : (
        <ProductItemListMain {...{ queryStringObj }} />
      )}
    </AsyncBoundary>
  );

  if (needPullToRefresh && isPossiblePullToRefresh) {
    return (
      <ProductListWrapperView {...{ paddingTop, paddingBottom }}>
        <PullToRefresh
          {...{
            refreshingContent,
            onRefresh: handleRefresh,
            pullDownThreshold,
            maxPullDownDistance,
          }}
        >
          {commonProducts}
        </PullToRefresh>
      </ProductListWrapperView>
    );
  }

  return (
    <ProductListWrapperView {...{ paddingTop, paddingBottom }}>
      {commonProducts}
    </ProductListWrapperView>
  );
}

export default memo(ProductItemList);
