import { memo } from 'react';

import { StyleProps } from '#types/props';
import classnames from 'classnames';
import ProductItem from 'src/components/Shop/molecules/ProductItem';

import $ from './style.module.scss';

type Props = {
  item: res.RecommendProduct;
} & StyleProps;

function RecommendItem(viewProps: Props) {
  const { item, className, style } = viewProps;
  const { product, associatedProduct } = item;
  // TODO: 윈도우 사이즈에 따라 스켈레톤 아이템 개수 다르게 하기

  return (
    <div {...{ style }} className={classnames($['recommend-item'], className)}>
      <ProductItem {...product} />
      <ProductItem {...associatedProduct} />
    </div>
  );
}

export default memo(RecommendItem);
