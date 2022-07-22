import { ProductBasicInfo } from '#types/product';
import { StyleProps } from '#types/props';
import { replace } from 'utils/replace';

import ProductCell from '../../atoms/ProductCell';
import $ from './style.module.scss';

type Props = {
  basic: ProductBasicInfo;
} & StyleProps;

export default function ProductBasic({ basic }: Props) {
  const { title, classification, brand, productInfo, styleInfo } = basic;

  const datas = [
    { label: '브랜드', description: brand },
    { label: '판매제품 정보', description: replace(productInfo, '/', '・') },
    {
      label: '스타일 정보',
      description: replace(styleInfo, '/', '・'),
      isBottom: true,
    },
  ];

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
