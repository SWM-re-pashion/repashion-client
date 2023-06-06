import { ProductSizeInfo } from '#types/product';
import { StyleProps } from '#types/props';
import BorderBox from '@atoms/BorderBox';
import StrongLabel from 'src/components/Product/atoms/StrongLabel';
import {
  judgeProductIcon,
  productSizeUtil,
} from 'src/helpers/productDataProcessing';

import ProductCell from '../../atoms/ProductCell';
import $ from './style.module.scss';

type Props = {
  size: ProductSizeInfo;
  kind: string;
} & StyleProps;

export default function ProductSize({ size, kind }: Props) {
  const datas = productSizeUtil(size);
  const ProductKind = judgeProductIcon(kind);
  const isNumber = (desc?: number) => typeof desc === 'number';

  return (
    <BorderBox className={$['product-size']}>
      <StrongLabel label="실측 사이즈표" />
      <div className={$['clothes-info']}>
        <ProductKind className={$['clothes-img']} />
        <div className={$['size-info']}>
          {datas.map(
            ({ label, desc }, idx) =>
              isNumber(desc) && (
                <ProductCell
                  key={label}
                  label={label}
                  desc={`${desc}cm`}
                  isTop={idx === 0}
                />
              ),
          )}
        </div>
      </div>
    </BorderBox>
  );
}
