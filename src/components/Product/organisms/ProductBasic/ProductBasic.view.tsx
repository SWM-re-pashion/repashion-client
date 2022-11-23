import { SaleStatusDataProp } from '#types/product';
import { StyleProps } from '#types/props';
import Span from '@atoms/Span';
import { SaleStatusData } from '@constants/status';
import SelectBox from '@molecules/SelectBox';
import classnames from 'classnames';
import { ProductBasicDataProp } from 'src/utils/product';
import { replace } from 'src/utils/replace';

import ProductCell from '../../atoms/ProductCell';
import $ from './style.module.scss';

type Props = {
  isMe: boolean;
  title: string;
  classification: string;
  datas: ProductBasicDataProp[];
  saleStatus: SaleStatusDataProp;
  handleStatusChange: (option: string) => void;
} & StyleProps;

export default function ProductBasicView(viewProps: Props) {
  const { isMe, title, classification, datas } = viewProps;
  const { handleStatusChange, saleStatus } = viewProps;

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
            options={SaleStatusData}
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
              [$.reserved]: saleStatus === '예약중',
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
