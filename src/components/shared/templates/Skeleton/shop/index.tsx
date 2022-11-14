import { StyleProps } from '#types/props';
import classnames from 'classnames';
import $$ from 'src/components/Shop/molecules/ProductItem/style.module.scss';
import $ from 'src/components/Shop/Organisms/ProductItemList/style.module.scss';

import sklt from './style.module.scss';

type Props = {
  itemNum: number;
  isRecommend: boolean;
};

function ShopItem({ isRecommend }: { isRecommend: boolean }) {
  return (
    <div
      className={classnames($$['common-item'], {
        [$$['recommend-item']]: isRecommend,
        [$$['product-item']]: !isRecommend,
      })}
    >
      <div
        className={classnames($$['product-img'], sklt['skeleton-product-img'])}
      />
      <div className={classnames($$['text-box'], sklt['skeleton-text-box'])}>
        <div className={classnames($$.title, sklt['skeleton-title'])} />
        <div
          className={classnames($$['size-like'], sklt['skeleton-size-like'])}
        />
        <div className={classnames($$.price, sklt['skeleton-price'])} />
        <div className={classnames($$.date, sklt['skeleton-date'])} />
      </div>
    </div>
  );
}

export function RecommendItemSkeleton(
  props: { isRecommend: boolean } & StyleProps,
) {
  const { isRecommend, className } = props;
  return (
    <div className={classnames($['recommend-item'], className)}>
      <ShopItem {...{ isRecommend }} />
      <ShopItem {...{ isRecommend }} />
    </div>
  );
}

function ShopSkeleton(skeletonProps: Props) {
  const { itemNum, isRecommend } = skeletonProps;
  const skeletonItemList = Array.from({ length: itemNum }, (_, i) => i);

  return (
    <article
      className={classnames($['product-list'], {
        [$['recommend-list']]: isRecommend,
      })}
    >
      {isRecommend
        ? skeletonItemList.map((item) => (
            <div key={item} className={$['recommend-item']}>
              <RecommendItemSkeleton {...{ isRecommend }} />
            </div>
          ))
        : skeletonItemList.map((item) => (
            <ShopItem key={item} {...{ isRecommend }} />
          ))}
    </article>
  );
}

export default ShopSkeleton;
