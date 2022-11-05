import { ProductBasicInfo } from '#types/product';
import { StyleProps } from '#types/props';
import SelectBox from '@molecules/SelectBox';
import { productBasicUtil } from 'src/utils/product';
import { replace } from 'src/utils/replace';

import ProductCell from '../../atoms/ProductCell';
import $ from './style.module.scss';

type Props = {
  basic: ProductBasicInfo;
  isSoldOut: boolean;
} & StyleProps;

export default function ProductBasic({ basic, isSoldOut }: Props) {
  const { title, classification } = basic;
  const datas = productBasicUtil(basic);
  const saleStatus = isSoldOut ? '판매완료' : '판매중';

  return (
    <>
      <header className={$['product-header']}>
        <div>
          <h1 className={$['product-title']}>{title}</h1>
          <span className={$['product-category']}>
            {replace(classification, '/', ' > ')}
          </span>
        </div>
        <SelectBox
          options={['판매중', '판매완료']}
          selected={saleStatus}
          name="sale-status"
          width="110px"
          height="24px"
          fontSize={14}
          fontWeight={700}
        />
      </header>

      <article>
        {datas.map((data) => (
          <ProductCell key={data.label} {...data} />
        ))}
      </article>
    </>
  );
}
