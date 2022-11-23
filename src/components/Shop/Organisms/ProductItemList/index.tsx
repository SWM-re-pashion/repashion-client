import { memo, useCallback } from 'react';

import Loading from '@atoms/Loading';
import PullToRefresh from '@templates/PullToRefresh';
import ShopSkeleton from 'src/components/Shop/Organisms/ProductItemList/Skeleton';
import { useIntersect } from 'src/hooks';
import { useSearchingItemListQuery } from 'src/hooks/api/search';
import {
  useMyItemListQuery,
  useProductItemListQuery,
  useRecommendItemListQuery,
} from 'src/hooks/api/shop';

import NoProductView from './NoProduct.view';
import ProductListView from './ProductList.view';
import ProductListWrapperView from './ProductListWrapper.view';

export type ProductItemListType = 'shop' | 'mypage' | 'recommend' | 'search';

type Props = {
  type: ProductItemListType;
  isRecommend?: boolean;
  needPullToRefresh?: boolean;
  queryStringObj?: Omit<req.ShopFeed, 'page' | 'size'>;
  height?: string;
  paddingTop?: string;
  paddingBottom?: string;
};

type ProductList = Props['queryStringObj'];

const useProductItemQuery = (type: ProductItemListType) => {
  if (type === 'search') return useSearchingItemListQuery;
  if (type === 'recommend') return useRecommendItemListQuery;
  if (type === 'mypage') return useMyItemListQuery;
  return useProductItemListQuery;
};

function ProductItemList(listProps: Props) {
  const { type, paddingTop, paddingBottom } = listProps;
  const { needPullToRefresh, queryStringObj, height } = listProps;
  const productList: ProductList = { ...queryStringObj };
  const useProductItem = useProductItemQuery(type);

  const {
    data,
    hasNextPage,
    isLoading,
    isFetching,
    fetchNextPage,
    refetch,
    remove,
  } = useProductItem(productList);

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

  const pages = data?.pages;
  const isRecommend = type === 'recommend';
  const itemList = pages?.map(({ items }) => items).flat();
  const isNoProducts = (itemList && !itemList.length) || false;

  const noProducts = (
    <NoProductView
      {...{
        isNoProducts,
        isLoading,
        isFetching,
        height,
      }}
    />
  );

  const refreshingContent = <Loading />;

  const pullDownThreshold = 60;
  const maxPullDownDistance = 90;

  const commonProducts = isLoading ? (
    <ShopSkeleton itemNum={12} {...{ isRecommend }} />
  ) : (
    // TODO: 윈도우 사이즈에 따라 스켈레톤 아이템 개수 다르게 하기
    <ProductListView
      {...{ intersectRef, isFetching, noProducts }}
      isRecommend={isRecommend}
      itemList={itemList}
    />
  );

  if (needPullToRefresh) {
    return (
      <ProductListWrapperView {...{ paddingTop, paddingBottom, height }}>
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
    <ProductListWrapperView {...{ paddingTop, paddingBottom, height }}>
      {commonProducts}
    </ProductListWrapperView>
  );
}

export default memo(ProductItemList);
