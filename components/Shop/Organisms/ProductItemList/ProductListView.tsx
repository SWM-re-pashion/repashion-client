/* eslint-disable react/no-array-index-key */
import { memo } from 'react';

import Loading from '@atoms/Loading';
import ProductItem from 'components/Shop/molecules/ProductItem';

import $ from './style.module.scss';

type Props = {
  intersectRef: React.RefObject<HTMLDivElement>;
  itemList: res.ProductSummary[];
};

function ProductListView(viewProps: Props) {
  const { itemList, intersectRef } = viewProps;
  return (
    <>
      <article className={$['product-list']}>
        {itemList.map(
          (item, idx) => (
            <ProductItem key={idx} {...item} />
          ), // TODO: key id로 바꾸기, 로딩에 isFetching 조건 추가
        )}
      </article>
      <div ref={intersectRef} />
      <Loading />
    </>
  );
}

export default memo(ProductListView);
