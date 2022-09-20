import { memo, useState } from 'react';

import Loading from '@atoms/Loading';
import { productItemListMocks } from '@mocks/productItemListMocks';
import PullToRefresh from '@templates/PullToRefresh';
import { useIntersect } from 'hooks';

import ProductListView from './ProductListView';
import ProductListWrapperView from './ProductListWrapperView';

type Props = {
  paddingTop?: string;
  paddingBottom?: string;
  needPullToRefresh?: boolean;
};

function ProductItemList(listProps: Props) {
  const { paddingTop, paddingBottom, needPullToRefresh } = listProps;
  const [itemListMocks, setItemlistMocks] = useState(productItemListMocks);
  const intersectRef = useIntersect((entry, observer) => {
    observer.unobserve(entry.target);
    setItemlistMocks([...itemListMocks, ...productItemListMocks]);
    // if (hasNextPage && !isFetching) { // TODO: api connection
    //   await fetchNextPage();
    // }
  });
  const refreshingContent = <Loading />;
  const onRefresh = () => console.log('refresh'); // TODO: api connection
  const pullDownThreshold = 60;
  const maxPullDownDistance = 90;

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
          <ProductListView {...{ intersectRef }} itemList={itemListMocks} />
        </PullToRefresh>
      </ProductListWrapperView>
    );
  }

  return (
    <ProductListWrapperView {...{ paddingTop, paddingBottom }}>
      <ProductListView {...{ intersectRef }} itemList={itemListMocks} />
    </ProductListWrapperView>
  );
}

export default memo(ProductItemList);
