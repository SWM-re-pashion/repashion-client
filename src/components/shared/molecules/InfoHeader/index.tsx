import { DefaultProps } from '#types/props';
import Description from '@atoms/Description';
import Required from '@atoms/Required';
import Title from '@atoms/Title';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props = {
  title: string;
  required?: boolean;
} & DefaultProps;

export default function InfoHeader({
  className,
  style,
  children,
  title,
  required,
}: Props) {
  return (
    <header {...{ style }} className={classnames($['info-header'], className)}>
      <div className={$['info-title']}>
        <Title className={$['info-title-msg']}>{title}</Title>
        {required && <Required className={$['required-msg']} />}
      </div>

      <Description className={$['info-description']}>{children}</Description>
    </header>
  );
}
