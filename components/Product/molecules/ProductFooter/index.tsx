import { ProductFooterInfo } from '#types/product';
import Button from '@atoms/Button';
import { ClickHeart, SmallHeart, Time, Views } from '@atoms/icon';
import IconText from '@atoms/IconText';
import Label from '@atoms/Label';
import classnames from 'classnames';
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

  return (
    <footer
      className={classnames($['product-footer'], className)}
      style={{ ...style }}
    >
      <div className={classnames($['footer-wrapper'], className)}>
        <div className={$['icon-text-box']}>
          <IconText Icon={Views} color="#936DFF" colorText={`${views}명`}>
            이 보았어요・
          </IconText>
          <IconText Icon={SmallHeart} color="#FF9635" colorText={`${like}명`}>
            이 관심있어요
          </IconText>
          <IconText Icon={Time}>이 관심있어요</IconText>
        </div>

        <div className={$['attractive-box']}>
          <ClickHeart />
          <div className={$['price-box']}>
            <Label color="#9E9E9E" className={$.delivery}>
              {isIncludeDelivery ? '배송비 포함' : '배송비 제외'}
            </Label>
            <Label color="#936DFF" className={$.price}>{`${price}원`}</Label>
          </div>
          <Button className={$['product-btn']}>{children}</Button>
        </div>
      </div>
    </footer>
  );
}
