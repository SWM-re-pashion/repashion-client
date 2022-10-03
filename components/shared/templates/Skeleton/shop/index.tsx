import classnames from 'classnames';
import $$ from 'components/Shop/molecules/ProductItem/style.module.scss';
import $ from 'components/Shop/Organisms/ProductItemList/style.module.scss';

import sklt from './style.module.scss';

type Props = {
  itemNum: number;
  paddingTop?: string;
  paddingBottom?: string;
};

function ShopSkeleton(skeletonProps: Props) {
  const { paddingTop, paddingBottom, itemNum } = skeletonProps;
  const skeletonItemList = Array.from({ length: itemNum }, (_, i) => i);

  return (
    <section
      style={{ paddingTop, paddingBottom }}
      className={$['product-container']}
    >
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
    </section>
  );
}

export default ShopSkeleton;
