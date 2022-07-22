import { ProductSizeInfo } from '#types/product';
import { StyleProps } from '#types/props';
import BorderBox from '@atoms/BorderBox';
import { OnePiece, Pants, Skirt, Top } from '@atoms/icon';
import StrongLabel from 'components/Product/atoms/StrongLabel';
import { productSizeUtil } from 'utils';

import ProductCell from '../../atoms/ProductCell';
import $ from './style.module.scss';

type Props = {
  size: ProductSizeInfo;
} & StyleProps;

export default function ProductSize({ size }: Props) {
  const datas = productSizeUtil(size);

  return (
    <BorderBox className={$['product-size']}>
      <StrongLabel label="실측 사이즈표" />
      <div className={$['clothes-info']}>
        <Top className={$['clothes-img']} />
        <div className={$['size-info']}>
          {datas.map(({ label, desc }) => {
            if (desc)
              return (
                <ProductCell key={label} label={label} desc={`${desc}cm`} />
              );
          })}
        </div>
      </div>
    </BorderBox>
  );
}
