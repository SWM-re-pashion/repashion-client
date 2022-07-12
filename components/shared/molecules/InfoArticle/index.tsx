import classnames from 'classnames';
import Label from 'components/shared/atoms/Label';
import Required from 'components/shared/atoms/Required';
import { DefaultProps } from 'types/props';

import $ from './style.module.scss';

type Props = {
  label: string | number;
  required?: boolean;
} & DefaultProps;

export default function InfoArticle({
  className,
  style,
  children,
  label,
  required,
}: Props) {
  return (
    <article
      {...{ style }}
      className={classnames($['info-article'], className)}
    >
      <div className={$['info-article-header']}>
        <Label className={$.label}>{label}</Label>
        {required && <Required className={$['required-msg']} />}
      </div>
      {children}
    </article>
  );
}
