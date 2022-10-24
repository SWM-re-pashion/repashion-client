import { DefaultProps } from '#types/props';
import Required from '@atoms/Required';
import Span from '@atoms/Span';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props = {
  label: string | number;
  childrenBox?: boolean;
  required?: boolean;
  description?: string;
} & DefaultProps;

export default function InfoArticle(infoProps: Props) {
  const { className, style, children } = infoProps;
  const { label, childrenBox, required, description } = infoProps;
  return (
    <article
      style={{ ...style }}
      className={classnames($['info-article'], className, {
        [$['children-box']]: childrenBox,
      })}
    >
      <div className={$['info-article-header']}>
        <div className={$['info-article-header-text']}>
          <Span className={$.label}>{label}</Span>
          {required && <Required className={$['required-msg']} />}
        </div>
        {description && (
          <Span fontSize={12} fontWeight={600} className={$.description}>
            {description}
          </Span>
        )}
      </div>

      {children}
    </article>
  );
}
