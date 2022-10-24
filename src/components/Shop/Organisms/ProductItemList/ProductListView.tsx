import { memo } from 'react';

import Loading from '@atoms/Loading';
import ProductItem from 'src/components/Shop/molecules/ProductItem';

import $ from './style.module.scss';

type Props = {
  isFetching: boolean;
  intersectRef: React.RefObject<HTMLDivElement>;
  itemList?: res.ProductSummary[];
  noProducts: React.ReactNode;
};

function ProductListView(viewProps: Props) {
  const { isFetching, itemList, intersectRef, noProducts } = viewProps;

  return (
    <>
      {itemList && (
        <article className={$['product-list']}>
          {itemList.map((item) => (
            <ProductItem key={item.id} {...item} />
          ))}
        </article>
      )}
      {noProducts}
      <div ref={intersectRef} />
      {isFetching && <Loading />}
    </>
  );
}

export default memo(ProductListView);
