import Required from '@atoms/Required';
import Span from '@atoms/Span';
import classnames from 'classnames';
import { DefaultProps } from 'types/props';

import $ from './style.module.scss';

type Props = {
  label: string | number;
  childrenBox?: boolean;
  required?: boolean;
} & DefaultProps;

export default function InfoArticle(infoProps: Props) {
  const { className, style, children } = infoProps;
  const { label, childrenBox, required } = infoProps;
  return (
    <article
      style={{ ...style }}
      className={classnames($['info-article'], className, {
        [$['children-box']]: childrenBox,
      })}
    >
      <div className={$['info-article-header']}>
        <Span className={$.label}>{label}</Span>
        {required && <Required className={$['required-msg']} />}
      </div>
      {children}
    </article>
  );
}
