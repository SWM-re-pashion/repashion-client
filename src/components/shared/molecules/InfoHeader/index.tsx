import { DefaultProps } from '#types/props';
import Description from '@atoms/Description';
import classnames from 'classnames';

import $ from './style.module.scss';
import TitleBox from './TitleBox';

type Props = { isStrongFontFamily?: boolean } & DefaultProps;

function InfoHeader(props: Props) {
  const { isStrongFontFamily, children, className, style } = props;
  return (
    <header
      {...{ style }}
      className={classnames($['info-header'], className, {
        [$['strong-font-family']]: isStrongFontFamily,
      })}
    >
      {children}
    </header>
  );
}

InfoHeader.TitleBox = TitleBox;
InfoHeader.Description = Description;

export default InfoHeader;
