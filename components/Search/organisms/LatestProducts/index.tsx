import { memo, useRef } from 'react';

import { SearchStoreState } from '#types/storeType/search';
import Span from '@atoms/Span';
import classnames from 'classnames';
import ImgCard from 'components/Upload/molecules/ImgCard';
import { useDragScroll } from 'hooks';

import $ from './style.module.scss';

type Props = {
  products: SearchStoreState['latestProducts'];
  removeProduct: SearchStoreState['removeProduct'];
  moveProduct: (id: number) => void;
};

function LatestProducts(inputProps: Props) {
  const { products, removeProduct, moveProduct } = inputProps;
  const containerRef = useRef<HTMLUListElement | null>(null);
  useDragScroll(containerRef);

  return (
    <div className={$['products-box']}>
      <Span fontSize={18}>최근 본 상품</Span>

      <ul
        className={$['current-products']}
        role="listbox"
        aria-label="최근 본 상품 목록"
        ref={containerRef}
      >
        <div
          className={classnames($['current-products-box'], {
            [$['no-products']]: !products.length,
          })}
        >
          {products.length ? (
            products.map(({ id, img }) => (
              <ImgCard
                key={id}
                onClick={moveProduct}
                noMargin
                {...{ id, src: img, first: false, remove: removeProduct }}
              />
            ))
          ) : (
            <Span fontWeight={500}>최근 본 상품이 존재하지 않습니다.</Span>
          )}
        </div>
      </ul>
    </div>
  );
}

export default memo(LatestProducts);
