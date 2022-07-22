import { ProductNoticeInfo } from '#types/product';
import { StyleProps } from '#types/props';
import StrongLabel from 'components/Product/atoms/StrongLabel';

import ProductCell from '../../atoms/ProductCell';
import $ from './style.module.scss';

type Props = {
  sellerNotice: ProductNoticeInfo;
} & StyleProps;

export default function ProductNotice({ sellerNotice }: Props) {
  const {
    condition,
    pollution,
    height,
    length,
    bodyForm,
    fit,
    purchaseTime,
    purchasePlace,
    reason,
  } = sellerNotice;

  const datas = [
    { label: '사용감', description: condition },
    { label: '오염 여부', description: pollution },
    { label: '기장', description: `키 ${height}cm 기준, ${length}까지` },
    { label: `${bodyForm}체형 기준`, description: `${fit}핏이에요` },
    { label: '구매시기', description: purchaseTime },
    { label: '구매처', description: purchasePlace },
    { label: '판매이유', description: reason },
  ];

  return (
    <article className={$['product-notice']}>
      <StrongLabel label="판매자가 알려드려요" mid />
      {datas.map((data) => {
        if (data.description) return <ProductCell key={data.label} {...data} />;
      })}
    </article>
  );
}
