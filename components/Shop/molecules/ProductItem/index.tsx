import Link from 'next/link';

import { memo } from 'react';

import { StyleProps } from '#types/props';
import BasicImg from '@atoms/BasicImg';
import BorderBox from '@atoms/BorderBox';
import { BasicHeart } from '@atoms/icon';
import Span from '@atoms/Span';
import { useTimeForToday } from 'hooks';

import $ from './style.module.scss';

type Props = res.ProductSummary & StyleProps;

function ProductItem(itemProps: Props) {
  const { id, img, title, size, like, price, isSoldOut, updatedAt } = itemProps;
  const date = useTimeForToday(updatedAt);

  return (
    <Link href={`/shop/${id}`}>
      <div className={$['product-item']}>
        <BasicImg width={113} height={113} src={img} alt={title}>
          {isSoldOut && (
            <BorderBox borderRadius="5px" className={$['soldout-box']}>
              <Span fontSize={12} color="#fff">
                sold out
              </Span>
            </BorderBox>
          )}
        </BasicImg>

        <div className={$['text-box']}>
          <Span className={$.title}>{title}</Span>
          <Span fontSize={14} className={$['size-like']}>
            {`size ${size} ・ `}
            <BasicHeart size={12} stroke="#9e9e9e" />
            {` ${like}`}
          </Span>
          <Span className={$.price}>{`${price.toLocaleString()}원`}</Span>
          <Span fontSize={12} className={$.date}>
            {date}
          </Span>
        </div>
      </div>
    </Link>
  );
}

export default memo(ProductItem);
