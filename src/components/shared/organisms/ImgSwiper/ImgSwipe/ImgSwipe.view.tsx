import type { DefaultProps } from '#types/props';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props = {
  imgListLen: number;
  turn: number;
} & DefaultProps;

function ImgSwipe(slideProps: Props) {
  const { children, className, style, imgListLen, turn } = slideProps;

  return (
    <li
      className={classnames($.slide, className)}
      style={style}
      aria-roledescription="slide"
      aria-label={`${imgListLen}개의 이미지 중 ${turn}번째 이미지`}
    >
      {children}
    </li>
  );
}
export default ImgSwipe;
