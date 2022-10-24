import Link from 'next/link';

import { memo } from 'react';

import { StyleProps } from '#types/props';
import ResponsiveImg from '@atoms/ResponsiveImg';
import Span from '@atoms/Span';
import { useTimeForToday } from 'src/hooks';

import SoldoutBox from '../SoldoutBox';
import $ from './style.module.scss';

type Props = res.ProductSummary & StyleProps;

function ProductItem(itemProps: Props) {
  const { id, img, title, size, like, price, isSoldOut, updatedAt } = itemProps;
  const date = useTimeForToday(updatedAt);

  return (
    <Link href={`/shop/${id}`}>
      <div className={$['product-item']}>
        <ResponsiveImg
          width={200}
          height={200}
          src={img}
          alt={title}
          className={$['product-img']}
        >
          <SoldoutBox {...{ isSoldOut }} />
        </ResponsiveImg>

        <div className={$['text-box']}>
          <Span fontWeight={600} className={$.title}>
            {title}
          </Span>
          <Span fontSize={14} fontWeight={600} className={$['size-like']}>
            {`size ${size} ・ like ${like}`}
          </Span>
          <Span
            fontSize={15}
            className={$.price}
          >{`${price.toLocaleString()}원`}</Span>
          <Span fontSize={12} fontWeight={500} className={$.date}>
            {date}
          </Span>
        </div>
      </div>
    </Link>
  );
}

export default memo(ProductItem);
