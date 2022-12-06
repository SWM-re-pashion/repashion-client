import { StyleProps } from '#types/props';
import Span from '@atoms/Span';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props = {
  description: string;
  fontSize?: number;
  fontWeight?: number;
  hasPreWrap?: boolean;
} & StyleProps;

export default function Description(props: Props) {
  const { description, className, style } = props;
  const { fontSize, fontWeight, hasPreWrap } = props;
  return (
    <Span
      style={style}
      fontSize={fontSize || 14}
      fontWeight={fontWeight || 500}
      hasPreWrap={hasPreWrap}
      className={classnames($.description, className)}
    >
      {description}
    </Span>
  );
}
