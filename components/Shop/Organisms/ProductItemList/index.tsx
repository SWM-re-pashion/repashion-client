/* eslint-disable react/no-array-index-key */
import { memo, useState } from 'react';

import { productItemListMocks } from '@mocks/productItemListMocks';
import ProductItem from 'components/Shop/molecules/ProductItem';
import { useIntersect } from 'hooks';
import Lottie from 'lottie-react';
import loading from 'public/assets/loading.json';

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
      <Lottie animationData={loading} className={$.loading} />
      <article className={$['product-list']}>
        {itemListMocks.map((itemData, idx) => {
          // TODO: 로딩에 isFetching 조건 추가
          return <ProductItem key={idx} {...itemData} />; // TODO: key id로 바꾸기
        })}
      </article>
      <div {...{ ref }} />
      <Lottie animationData={loading} className={$.loading} />
    </section>
  );
}

export default memo(ProductItemList);
