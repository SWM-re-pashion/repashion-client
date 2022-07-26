import { ProductNoticeInfo } from '#types/product';
import { StyleProps } from '#types/props';
import StrongLabel from 'components/Product/atoms/StrongLabel';
import { productNoticeUtil } from 'utils/product';

import ProductCell from '../../atoms/ProductCell';
import $ from './style.module.scss';

type Props = {
  sellerNotice: ProductNoticeInfo;
} & StyleProps;

export default function ProductNotice({ sellerNotice }: Props) {
  const datas = productNoticeUtil(sellerNotice);

  return (
    <article className={$['product-notice']}>
      <StrongLabel label="판매자가 알려드려요" mid />
      {datas.map(
        (data) => data.desc && <ProductCell key={data.label} {...data} />,
      )}
    </article>
  );
}
