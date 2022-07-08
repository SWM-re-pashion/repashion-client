import classnames from 'classnames';
import Description from 'components/shared/atoms/Description';
import Title from 'components/shared/atoms/Title';
import { DefaultProps } from 'types/props';

import $ from './style.module.scss';

type Props = {
  title: string;
} & DefaultProps;

export default function InfoHeader({
  className,
  style,
  children,
  title,
}: Props) {
  return (
    <header {...{ style }} className={classnames($['info-header'], className)}>
      <Title className={$['info-title']}>{title}</Title>
      <Description className={$['info-description']}>{children}</Description>
    </header>
  );
}
