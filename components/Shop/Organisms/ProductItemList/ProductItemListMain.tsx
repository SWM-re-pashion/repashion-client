import { forwardRef, memo, Ref, useCallback, useImperativeHandle } from 'react';

import { GetInfiniteProducts } from 'api/shop';
import { useIntersect } from 'hooks';
import { useProductItemListQuery } from 'hooks/api/shop';

import NoProductView from './NoProductView';
import ProductListView from './ProductListView';

export type ProductItemListRefresh = {
  onRefresh: GetInfiniteProducts;
};

type Props = {
  queryStringObj?: Omit<req.ShopFeed, 'page' | 'size'>;
};

type ProductList = Props['queryStringObj'];

function ProductItemListMain(listProps: Props, ref?: Ref<unknown> | undefined) {
  const { queryStringObj } = listProps;
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

  useImperativeHandle(
    ref,
    () => ({
      onRefresh,
    }),
    [onRefresh],
  );

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

  return (
    <ProductListView
      {...{ intersectRef, isFetching, noProducts }}
      itemList={itemList}
    />
  );
}
const ProductItemListWithRef = forwardRef<ProductItemListRefresh, Props>(
  ProductItemListMain,
);
export default memo(ProductItemListWithRef);
