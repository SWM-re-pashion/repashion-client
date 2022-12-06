import { DefaultProps } from '#types/props';
import InfoHeader from '@molecules/InfoHeader';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props = {
  label: string;
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
      <InfoHeader className={$['info-article-header']}>
        <InfoHeader.TitleBox
          className={$['info-article-header-text']}
          title={label}
          marginLeft="7px"
          required={required}
        />
        {description && (
          <InfoHeader.Description
            description={description}
            fontSize={12}
            fontWeight={600}
            className={$.description}
          />
        )}
      </InfoHeader>

      {children}
    </article>
  );
}
