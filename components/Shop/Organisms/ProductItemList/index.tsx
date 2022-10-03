import { memo } from 'react';

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

  const onRefresh = () => {
    remove();
    return refetch({
      refetchPage: (_, index) => index === 0,
    });
  };

  const intersectRef = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      await fetchNextPage();
    }
  });

  const refreshingContent = <Loading />;

  const pullDownThreshold = 60;
  const maxPullDownDistance = 90;

  if (isLoading) {
    return <ShopSkeleton itemNum={10} />;
  }

  const items = data?.pages;
  if (!items) return null;

  const itemList = items?.reduce((acc: res.ProductSummary[], cur) => {
    acc.push(...cur.items);
    return acc;
  }, []);

  const isNoProducts = !!itemList.length;

  const noProducts = (
    <NoProductView
      {...{
        isNoProducts,
        isLoading,
        isFetching,
      }}
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
          <ProductListView
            {...{ intersectRef, isFetching, noProducts }}
            itemList={itemList}
          />
        </PullToRefresh>
      </ProductListWrapperView>
    );
  }

  return (
    <ProductListWrapperView {...{ paddingTop, paddingBottom }}>
      <ProductListView
        {...{ intersectRef, isFetching, noProducts }}
        itemList={itemList}
      />
    </ProductListWrapperView>
  );
}

export default memo(ProductItemList);
