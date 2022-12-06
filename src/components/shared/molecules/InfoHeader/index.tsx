import { DefaultProps } from '#types/props';
import Required from '@atoms/Required';
import Span from '@atoms/Span';
import Title from '@atoms/Title';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props = {
  title: string;
  required?: boolean;
  description?: string;
} & DefaultProps;

export default function InfoHeader(props: Props) {
  const { title, required, description, className, style } = props;
  return (
    <header {...{ style }} className={classnames($['info-header'], className)}>
      <div className={$['info-title']}>
        <Title className={$['info-title-msg']}>{title}</Title>
        {required && <Required className={$['required-msg']} />}
      </div>

      {description && (
        <Span fontSize={14} fontWeight={500} hasPreWrap>
          {description}
        </Span>
      )}
    </header>
  );
}
