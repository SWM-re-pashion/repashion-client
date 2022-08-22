import classnames from 'classnames';

import type { DefaultProps } from 'types/props';

import $ from './style.module.scss';

type Props = {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  color?: string;
  colorText?: string;
} & DefaultProps;

export default function IconText({
  className,
  children,
  Icon,
  color,
  colorText,
}: Props) {
  return (
    <div className={classnames($['icon-text'], className)}>
      <Icon className={$.icon} />
      <span className={$.text} style={{ color }}>
        {colorText}
      </span>
      <span className={$.text}>{children}</span>
    </div>
  );
}
