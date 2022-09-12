/* eslint-disable react/no-array-index-key */
import { memo, useState } from 'react';

import Loading from '@atoms/Loading';
import { productItemListMocks } from '@mocks/productItemListMocks';
import PullToRefresh from '@templates/PullToRefresh';
import ProductItem from 'components/Shop/molecules/ProductItem';
import { useIntersect } from 'hooks';

import $ from './style.module.scss';

function ProductItemList() {
  const [itemListMocks, setItemlistMocks] = useState(productItemListMocks);
  const ref = useIntersect((entry, observer) => {
    observer.unobserve(entry.target);
    setItemlistMocks([...itemListMocks, ...productItemListMocks]);
    // if (hasNextPage && !isFetching) { // TODO: api connection
    //   await fetchNextPage();
    // }
  });

  return (
    <section className={$['product-container']}>
      <PullToRefresh
        refreshingContent={<Loading />}
        onRefresh={() => console.log('refresh')}
        pullDownThreshold={60}
        maxPullDownDistance={90}
      >
        <>
          <article className={$['product-list']}>
            {itemListMocks.map((itemData, idx) => {
              // TODO: 로딩에 isFetching 조건 추가
              return <ProductItem key={idx} {...itemData} />; // TODO: key id로 바꾸기
            })}
          </article>
          <div {...{ ref }} />
          <Loading />
        </>
      </PullToRefresh>
    </section>
  );
}

export default memo(ProductItemList);
