import { ProductBasicInfo } from '#types/product';
import { StyleProps } from '#types/props';
import { productBasicUtil } from 'utils/product';
import { replace } from 'utils/replace';

import ProductCell from '../../atoms/ProductCell';
import $ from './style.module.scss';

type Props = {
  basic: ProductBasicInfo;
} & StyleProps;

export default function ProductBasic({ basic }: Props) {
  const { title, classification } = basic;
  const datas = productBasicUtil(basic);

  return (
    <>
      <header className={$['product-header']}>
        <h1 className={$['product-title']}>{title}</h1>
        <span className={$['product-category']}>
          {replace(classification, '/', ' > ')}
        </span>
      </header>

      <article>
        {datas.map((data) => (
          <ProductCell key={data.label} {...data} />
        ))}
      </article>
    </>
  );
}
