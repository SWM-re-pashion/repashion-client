import { ProductFooterInfo } from '#types/product';
import Button from '@atoms/Button';
import { ClickHeart, SmallHeart, Time, Views } from '@atoms/icon';
import IconText from '@atoms/IconText';
import Span from '@atoms/Span';
import classnames from 'classnames';
import useTimeForToday from 'hooks/useTimeForToday';
import type { DefaultProps } from 'types/props';

import $ from './style.module.scss';

type Props = {
  footer: ProductFooterInfo;
} & DefaultProps;

export default function ProductFooter({
  className,
  style,
  children,
  footer,
}: Props) {
  const { price, isIncludeDelivery, updatedAt, like, views } = footer;
  const time = useTimeForToday(updatedAt);
  const iconData = [
    {
      Icon: Views,
      color: '#936DFF',
      colorText: `${views}명`,
      text: '이 보았어요・',
    },
    {
      Icon: SmallHeart,
      color: '#FF9635',
      colorText: `${like}명`,
      text: '이 관심있어요',
    },
    {
      Icon: Time,
      text: time,
    },
  ];

  return (
    <footer
      className={classnames($['product-footer'], className)}
      style={{ ...style }}
    >
      <div className={classnames($['footer-wrapper'], className)}>
        <div className={$['icon-text-box']}>
          {iconData.map(({ Icon, color, colorText, text }, idx) => (
            <IconText
              key={text}
              className={classnames({ [$.time]: idx === 2 })}
              {...{ Icon, color, colorText }}
            >
              {text}
            </IconText>
          ))}
        </div>

        <div className={$['attractive-box']}>
          <ClickHeart />
          <div className={$['price-box']}>
            <Span color="#9E9E9E" className={$.delivery}>
              {isIncludeDelivery ? '배송비 포함' : '배송비 제외'}
            </Span>
            <Span
              color="#936DFF"
              className={$.price}
            >{`${price.toLocaleString()}원`}</Span>
          </div>
          <Button className={$['product-btn']}>{children}</Button>
        </div>
      </div>
    </footer>
  );
}
