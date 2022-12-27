import type { DefaultProps } from '#types/props';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props = {
  imgListLen: number;
  turn: number;
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
  minWidth?: string;
  minHeight?: string;
  backgroundColor?: string;
} & DefaultProps;

function ImgSwipe(slideProps: Props) {
  const { children, className, style, imgListLen, turn, backgroundColor } =
    slideProps;
  const { width, height, maxHeight, maxWidth, minWidth, minHeight } =
    slideProps;

  return (
    <li
      className={classnames($.slide, className)}
      style={{ ...style }}
      aria-roledescription="slide"
      aria-label={`${imgListLen}개의 이미지 중 ${turn}번째 이미지`}
    >
      <div
        style={{
          width,
          height,
          maxHeight,
          maxWidth,
          minWidth,
          minHeight,
          backgroundColor,
        }}
        className={$['img-wrapper']}
      >
        {children}
      </div>
    </li>
  );
}
export default ImgSwipe;
