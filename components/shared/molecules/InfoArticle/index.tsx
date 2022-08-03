import Label from '@atoms/Label';
import Required from '@atoms/Required';
import classnames from 'classnames';
import { DefaultProps } from 'types/props';

import $ from './style.module.scss';

type Props = {
  label: string | number;
  childrenBox?: boolean;
  required?: boolean;
} & DefaultProps;

export default function InfoArticle(infoProps: Props) {
  const { className, style, children, label, childrenBox, required } =
    infoProps;
  return (
    <article
      style={{ ...style }}
      className={classnames($['info-article'], className, {
        [$['children-box']]: childrenBox,
      })}
    >
      <div className={$['info-article-header']}>
        <Label className={$.label}>{label}</Label>
        {required && <Required className={$['required-msg']} />}
      </div>
      {children}
    </article>
  );
}
