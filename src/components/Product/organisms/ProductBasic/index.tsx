import { ProductBasicInfo } from '#types/product';
import { StyleProps } from '#types/props';
import Span from '@atoms/Span';
import SelectBox from '@molecules/SelectBox';
import classnames from 'classnames';
import { useUpdateProductStatus } from 'src/hooks/api/product';
import { productBasicUtil } from 'src/utils/product';
import { replace } from 'src/utils/replace';

import ProductCell from '../../atoms/ProductCell';
import $ from './style.module.scss';

type Props = {
  id: string;
  basic: ProductBasicInfo;
  isMe: boolean;
  isSoldOut: boolean;
} & StyleProps;

export default function ProductBasic({ id, basic, isMe, isSoldOut }: Props) {
  const { title, classification } = basic;
  const { mutate } = useUpdateProductStatus(id);
  const handleStatusChange = (option: string) => mutate(id); // TODO: 추후에 판매 상태 추가 후 option param 활용
  const datas = productBasicUtil(basic);
  const saleStatus = isSoldOut ? '판매완료' : '판매중';

  return (
    <>
      <header className={$['product-header']}>
        <div className={$['product-title-box']}>
          <h1 className={$['product-title']}>{title}</h1>
          <span className={$['product-category']}>
            {replace(classification, '/', ' > ')}
          </span>
        </div>
        {isMe ? (
          <SelectBox
            onQueryChange={handleStatusChange}
            options={['판매중', '판매완료']}
            selected={saleStatus}
            name="sale-status"
            width="100px"
            height="24px"
            fontSize={14}
            fontWeight={700}
          />
        ) : (
          <Span
            fontSize={14}
            className={classnames($['product-status'], {
              [$.soldout]: saleStatus === '판매완료',
              [$.sale]: saleStatus === '판매중',
            })}
          >
            {saleStatus}
          </Span>
        )}
      </header>

      <article>
        {datas.map((data) => (
          <ProductCell key={data.label} {...data} />
        ))}
      </article>
    </>
  );
}
