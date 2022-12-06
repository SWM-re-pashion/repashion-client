import { StyleProps } from '#types/props';
import Required from '@atoms/Required';
import Span from '@atoms/Span';
import Title from '@atoms/Title';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props = {
  title: string;
  marginLeft: string;
  isHeader?: boolean;
  required?: boolean;
} & StyleProps;

function TitleBox(props: Props) {
  const { className, style } = props;
  const { isHeader, marginLeft, required, title } = props;
  return (
    <div style={style} className={classnames($['info-title'], className)}>
      {isHeader ? (
        <Title className={$['info-title-msg']}>{title}</Title>
      ) : (
        <Span>{title}</Span>
      )}
      {required && <Required style={{ marginLeft }} />}
    </div>
  );
}
export default TitleBox;
