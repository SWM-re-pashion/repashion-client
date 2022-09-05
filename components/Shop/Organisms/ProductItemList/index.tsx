/* eslint-disable react/no-array-index-key */
import { memo, useRef, useState } from 'react';

import { productItemListMocks } from '@mocks/productItemListMocks';
import classnames from 'classnames';
import ProductItem from 'components/Shop/molecules/ProductItem';
import { useIntersect } from 'hooks/useIntersect';

import $ from './style.module.scss';

function ProductItemList() {
  const [itemListMocks, setItemlistMocks] = useState(productItemListMocks);
  const ref = useIntersect((entry, observer) => {
    // observer.unobserve(entry.target);
    // setItemlistMocks([...itemListMocks, ...productItemListMocks]);
    // if (hasNextPage && !isFetching) {
    //   await fetchNextPage();
    // }
  });

  return (
    <section className={$['product-list']}>
      {itemListMocks.map((itemData, idx) => {
        return <ProductItem key={idx} {...itemData} />; // TODO: key id로 바꾸기
      })}
      <div {...{ ref }} />
    </section>
  );
}

export default memo(ProductItemList);
