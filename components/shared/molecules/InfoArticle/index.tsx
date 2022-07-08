import classnames from 'classnames';
import Label from 'components/shared/atoms/Label';
import { DefaultProps } from 'types/props';

import $ from './style.module.scss';

type Props = {
  label: string | number;
} & DefaultProps;

export default function InfoHeader({
  className,
  style,
  children,
  label,
}: Props) {
  return (
    <article
      {...{ style }}
      className={classnames($['info-article'], className)}
    >
      <Label className={$.label}>{label}</Label>
      {children}
    </article>
  );
}
