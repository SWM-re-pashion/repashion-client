import { memo, useRef } from 'react';

import { SearchStoreState } from '#types/storeType/search';
import Span from '@atoms/Span';
import classnames from 'classnames';
import ImgCard from 'src/components/Upload/molecules/ImgCard';
import useSwipe from 'src/hooks/useSwipe';

import $ from './style.module.scss';

type Props = {
  products: SearchStoreState['latestProducts'];
  removeProduct: SearchStoreState['removeProduct'];
  moveProduct: (id: number) => void;
};

function LatestProducts(inputProps: Props) {
  const { products, removeProduct, moveProduct } = inputProps;
  const containerRef = useRef<HTMLUListElement | null>(null);
  useSwipe(containerRef);

  return (
    <div className={$['products-box']}>
      <Span fontSize={18}>최근 본 상품</Span>
      <div className={$['current-products']}>
        <ul
          className={classnames($['current-products-box'], {
            [$['no-products']]: !products.length,
          })}
          role="listbox"
          aria-label="최근 본 상품 목록"
          ref={containerRef}
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
        </ul>
      </div>
    </div>
  );
}

export default memo(LatestProducts);
