import { useState } from 'react';

import { ProductFooterInfo } from '#types/product';
import type { DefaultProps } from '#types/props';
import Button from '@atoms/Button';
import { ClickHeart, SmallHeart, Time, Views } from '@atoms/icon';
import IconText from '@atoms/IconText';
import Span from '@atoms/Span';
import DialogModal from '@templates/DialogModal';
import classnames from 'classnames';
import useTimeForToday from 'src/hooks/useTimeForToday';
import { toastSuccess } from 'src/utils/toaster';

import $ from './style.module.scss';

type Props = {
  footer: ProductFooterInfo;
} & DefaultProps;

export default function ProductFooter(footerProps: Props) {
  const { className, style, children, footer } = footerProps;
  const { price, isIncludeDelivery, updatedAt, like, views, contact } = footer;
  const time = useTimeForToday(updatedAt);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const handleClickLike = () =>
    toastSuccess({ message: '좋아요 기능 준비중입니다.' });

  const iconData = [
    {
      Icon: Views,
      color: '#936DFF',
      colorText: `${views || 0}명`,
      text: '이 보았어요・',
    },
    {
      Icon: SmallHeart,
      color: '#FF9635',
      colorText: `${like || 0}명`,
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
          <Button iconBtn onClick={handleClickLike}>
            <ClickHeart />
          </Button>

          <div className={$['price-box']}>
            <Span color="#9E9E9E" className={$.delivery}>
              {isIncludeDelivery ? '배송비 포함' : '배송비 제외'}
            </Span>
            <Span
              color="#936DFF"
              className={$.price}
            >{`${price.toLocaleString()}원`}</Span>
          </div>
          <Button className={$['product-btn']} onClick={openModal}>
            {children}
          </Button>

          <DialogModal
            id="contact-modal"
            label="판매자에게 연락하기 모달"
            isOpen={isOpen}
            title="아래 정보를 통해 연락할 수 있습니다."
            content="현재 채팅 기능 준비중이에요. 서비스 준비 전까지 조금만 기다려주세요."
            emphasisContent={contact}
            clickText="닫기"
            onClick={closeModal}
          />
        </div>
      </div>
    </footer>
  );
}
