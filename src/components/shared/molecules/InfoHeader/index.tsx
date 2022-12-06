import { StyleProps } from '#types/props';
import Description from '@atoms/Description';
import Required from '@atoms/Required';
import Span from '@atoms/Span';
import Title from '@atoms/Title';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props = {
  title: string;
  required?: boolean;
  description?: string;
} & StyleProps;

export default function InfoHeader(props: Props) {
  const { title, required, description, className, style } = props;
  return (
    <header {...{ style }} className={classnames($['info-header'], className)}>
      <div className={$['info-title']}>
        <Title className={$['info-title-msg']}>{title}</Title>
        {required && <Required className={$['required-msg']} />}
      </div>

      {description && <Description description={description} hasPreWrap />}
    </header>
  );
}
