import { useRef } from 'react';

import { StyleProps } from '#types/props';
import { NoProduct } from '@atoms/icon';
import StrongLabel from 'src/components/Product/atoms/StrongLabel';
import ProductItem from 'src/components/Shop/molecules/ProductItem';
import { useProductRecommendItemList } from 'src/hooks/api/recommend';
import useSwipe from 'src/hooks/useSwipe';

import $ from './style.module.scss';

type Props = {
  id: string;
} & StyleProps;

export default function ProductRecommend({ id }: Props) {
  const { data } = useProductRecommendItemList(id);
  const ref = useRef<HTMLDivElement>(null);
  useSwipe(ref);
  const recommendData = data?.data;
  const isNoData = recommendData && recommendData.length === 0;

  return (
    <article className={$['product-recommend']}>
      <StrongLabel label="이런 옷이 어울릴 것 같아요" mid />
      <div className={$['item-list-wrapper']}>
        <div className={$['item-list']} ref={ref}>
          {recommendData?.map((item) => (
            <ProductItem isUnknown key={item.id} {...item} />
          ))}
          {isNoData && <NoProduct className={$['no-product']} />}
        </div>
      </div>
    </article>
  );
}
