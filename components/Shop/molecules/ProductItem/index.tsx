import Link from 'next/link';

import { memo } from 'react';

import BasicImg from '@atoms/BasicImg';
import { BasicHeart } from '@atoms/icon';
import Span from '@atoms/Span';

import $ from './style.module.scss';

type Props = {
  id: number;
  img: string;
  title: string;
  size: string;
  like: number;
  price: number;
};

function ProductItem(itemProps: Props) {
  const { id, img, title, size, like, price } = itemProps;

  return (
    <Link href={`/shop/${id}`}>
      <div className={$['product-item']}>
        <BasicImg width={113} height={113} src={img} alt={title} />

        <div className={$['text-box']}>
          <Span>{title}</Span>
          <Span fontSize={14} className={$['size-like']}>
            {`size ${size} ・ `}
            <BasicHeart size={12} stroke="#9e9e9e" />
            {` ${like}`}
          </Span>
          <Span className={$.price}>{`${price.toLocaleString()}원`}</Span>
        </div>
      </div>
    </Link>
  );
}

export default memo(ProductItem);
