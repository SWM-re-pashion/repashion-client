import { memo, useCallback } from 'react';

import Loading from '@atoms/Loading';
import PullToRefresh from '@templates/PullToRefresh';
import ShopSkeleton from '@templates/Skeleton/shop';
import { useIntersect } from 'hooks';
import { useProductItemListQuery } from 'hooks/api/shop';

import NoProductView from './NoProductView';
import ProductListView from './ProductListView';
import ProductListWrapperView from './ProductListWrapperView';

type Props = {
  queryStringObj?: Omit<req.ShopFeed, 'page' | 'size'>;
  paddingTop?: string;
  paddingBottom?: string;
  needPullToRefresh?: boolean;
};

type ProductList = Props['queryStringObj'];

function ProductItemList(listProps: Props) {
  const { paddingTop, paddingBottom, needPullToRefresh, queryStringObj } =
    listProps;

  const productList: ProductList = { ...queryStringObj };

  const {
    data,
    hasNextPage,
    isLoading,
    isFetching,
    fetchNextPage,
    refetch,
    remove,
  } = useProductItemListQuery(productList);

  const onRefresh = useCallback(() => {
    remove();
    return refetch({
      refetchPage: (_, index) => index === 0,
    });
  }, [refetch, remove]);

  const intersectRef = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      await fetchNextPage();
    }
  });

  const items = data?.pages;

  const itemList = items?.reduce((acc: res.ProductSummary[], cur) => {
    acc.push(...cur.items);
    return acc;
  }, []);

  const isNoProducts = (itemList && !itemList.length) || false;

  const noProducts = (
    <NoProductView
      {...{
        isNoProducts,
        isLoading,
        isFetching,
      }}
    />
  );

  const refreshingContent = <Loading />;

  const pullDownThreshold = 60;
  const maxPullDownDistance = 90;

  const commonProducts = isLoading ? (
    <ShopSkeleton itemNum={12} />
  ) : (
    <ProductListView
      {...{ intersectRef, isFetching, noProducts }}
      itemList={itemList}
    />
  );

  if (needPullToRefresh) {
    return (
      <ProductListWrapperView {...{ paddingTop, paddingBottom }}>
        <PullToRefresh
          {...{
            refreshingContent,
            onRefresh,
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
