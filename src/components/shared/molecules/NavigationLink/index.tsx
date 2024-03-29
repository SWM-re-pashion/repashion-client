import Link from 'next/link';

import Span from '@atoms/Span';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props = {
  label: string;
  route: {
    id: number;
    icon: any;
    label?: string;
    href: string;
  };
  isActive?: boolean;
  isUpload?: boolean;
};

function NavigationLink({ label, route, isActive, isUpload }: Props) {
  return (
    <Link href={route.href}>
      <button
        type="button"
        aria-label={label}
        className={classnames(isUpload ? $.upload : $.link, {
          [$['is-Active']]: isActive,
        })}
      >
        <route.icon fill={isActive ? '#936dff' : '#000'} />
        {!isUpload && (
          <Span fontSize={10} className={$.text}>
            {route.label}
          </Span>
        )}
      </button>
    </Link>
  );
}

export default NavigationLink;
