import { StyleProps } from '#types/props';
import Span from '@atoms/Span';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props = {
  fontSize?: number;
  fontWeight?: number;
} & StyleProps;

export default function Required(props: Props) {
  const { className, style, fontSize, fontWeight } = props;
  return (
    <Span
      {...{ style }}
      fontWeight={fontWeight}
      fontSize={fontSize || 10}
      className={classnames($.required, className)}
    >
      필수
    </Span>
  );
}
