import Link from 'next/link';

import { memo } from 'react';

import { StyleProps } from '#types/props';
import ResponsiveImg from '@atoms/ResponsiveImg';
import Span from '@atoms/Span';
import classnames from 'classnames';
import { useTimeForToday } from 'src/hooks';

import SoldoutBox from '../SoldoutBox';
import $ from './style.module.scss';

type Props = { isUnknown?: boolean } & res.ProductSummary & StyleProps;

function ProductItem(itemProps: Props) {
  const { id, img, title, size, like, price } = itemProps;
  const { isSoldOut, updatedAt, type, isUnknown } = itemProps;
  const isRecommend = !!type;
  const isTop = type === 'top';
  const clothesText = isTop ? '상의' : '하의';
  const date = useTimeForToday(updatedAt);

  return (
    <Link href={`/shop/${id}`}>
      <div
        className={classnames($['common-item'], {
          [$['recommend-item']]: isRecommend,
          [$['product-item']]: !isRecommend && !isUnknown,
          [$['unknown-item']]: isUnknown,
        })}
      >
        <ResponsiveImg
          width={200}
          height={200}
          src={img}
          alt={title}
          className={$['product-img']}
        >
          <SoldoutBox {...{ isSoldOut }} />
          {isRecommend && (
            <Span
              fontSize={12}
              fontWeight={700}
              className={classnames($['clothes-tag'], { [$.top]: isTop })}
            >
              {clothesText}
            </Span>
          )}
        </ResponsiveImg>

        <div className={$['text-box']}>
          <Span fontWeight={600} className={$.title}>
            {title}
          </Span>
          {!isUnknown && (
            <Span fontSize={14} fontWeight={600} className={$['size-like']}>
              {`size ${size} ・ like ${like}`}
            </Span>
          )}
          <Span
            fontSize={15}
            className={$.price}
          >{`${price.toLocaleString()}원`}</Span>
          {!isUnknown && (
            <Span fontSize={12} fontWeight={500} className={$.date}>
              {date}
            </Span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default memo(ProductItem);
