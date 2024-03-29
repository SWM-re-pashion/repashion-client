import React, { useState } from 'react';

import { ImgProps } from '#types/index';
import type { DefaultProps } from '#types/props';
import BaseImage from '@atoms/BaseImage';
import { IMG_SLIDE_SIZES } from '@constants/img';
import InfoPageNum from '@molecules/InfoPageNum';
import ImgSwiper from '@organisms/ImgSwiper';
import ImgSwipe from '@organisms/ImgSwiper/ImgSwipe/ImgSwipe.view';
import SoldoutBox from 'src/components/Shop/molecules/SoldoutBox';

import $ from './style.module.scss';

type Props = {
  imgList: (ImgProps | string)[];
  isSoldOut: boolean;
} & DefaultProps;

export default function ImgSlide(slideProps: Props) {
  const { children, className, style, imgList, isSoldOut } = slideProps;
  const imgListLen = imgList.length;
  const [imgNum, setImgNum] = useState(0);
  // const isSoldOut = status === 'soldout'; // TODO: 추후에 상품 상태 추가

  return (
    <section className={$['slide-box']}>
      {children}
      <ImgSwiper
        backgroundColor="#e3e1e1"
        className={className}
        style={style}
        imgListLen={imgListLen}
        setImgNum={setImgNum}
        slideCover={<SoldoutBox {...{ isSoldOut }} />}
      >
        {imgList.map((img, idx) => {
          const key = (typeof img !== 'string' ? img.src + img.alt : img) + idx;
          const src = typeof img !== 'string' ? img.src : img;
          const alt =
            (typeof img !== 'string' && img.alt) || `이미지${idx + 1}`;
          return (
            <ImgSwipe
              key={key}
              imgListLen={imgListLen}
              turn={idx + 1}
              className={$.slide}
              maxWidth="600px"
              maxHeight="600px"
              backgroundColor="#121212"
            >
              <BaseImage
                {...{ src, alt }}
                width={600}
                height={600}
                sizes={IMG_SLIDE_SIZES}
              />
            </ImgSwipe>
          );
        })}
      </ImgSwiper>

      <InfoPageNum className={$['page-num']}>{`${
        imgNum + 1
      }/${imgListLen}`}</InfoPageNum>
    </section>
  );
}
