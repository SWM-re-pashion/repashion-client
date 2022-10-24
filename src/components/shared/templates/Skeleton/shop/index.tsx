import classnames from 'classnames';
import $$ from 'src/components/Shop/molecules/ProductItem/style.module.scss';
import $ from 'src/components/Shop/Organisms/ProductItemList/style.module.scss';

import sklt from './style.module.scss';

type Props = {
  itemNum: number;
};

function ShopSkeleton(skeletonProps: Props) {
  const { itemNum } = skeletonProps;
  const skeletonItemList = Array.from({ length: itemNum }, (_, i) => i);

  return (
    <article className={$['product-list']}>
      {skeletonItemList.map((item) => (
        <div key={item} className={$$['product-item']}>
          <div
            className={classnames(
              $$['product-img'],
              sklt['skeleton-product-img'],
            )}
          />
          <div
            className={classnames($$['text-box'], sklt['skeleton-text-box'])}
          >
            <div className={classnames($$.title, sklt['skeleton-title'])} />
            <div
              className={classnames(
                $$['size-like'],
                sklt['skeleton-size-like'],
              )}
            />
            <div className={classnames($$.price, sklt['skeleton-price'])} />
            <div className={classnames($$.date, sklt['skeleton-date'])} />
          </div>
        </div>
      ))}
    </article>
  );
}

export default ShopSkeleton;
