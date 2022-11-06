import { useRouter } from 'next/router';

import { memo, useEffect, useState } from 'react';

import { Chat, Shop, MyPage, Plus, SearchBlack } from '@atoms/icon';
import NavigationLink from '@molecules/NavigationLink';
import classnames from 'classnames';
import { useScrollDetect } from 'src/hooks';

import $ from './style.module.scss';

function Footer() {
  const { pathname } = useRouter();
  const scrollDir = useScrollDetect();
  const [isDown, setDown] = useState(false);

  useEffect(() => {
    if (scrollDir === 'down') setDown(true);
    else setDown(false);
  }, [scrollDir]);

  const routes = [
    {
      id: 1,
      icon: Shop,
      label: 'shop',
      href: '/shop',
    },
    {
      id: 2,
      icon: SearchBlack,
      label: 'search',
      href: '/search',
    },
    // {
    //   id: 3,
    //   icon: Chat,
    //   label: 'chat',
    //   href: '',
    // },
    {
      id: 4,
      icon: MyPage,
      label: 'me',
      href: '/mypage',
    },
  ];

  const uploadRoute = {
    id: 5,
    icon: Plus,
    href: '/upload',
  };

  return (
    <footer className={$.footer}>
      <div className={classnames($['footer-wrapper'], { [$.down]: isDown })}>
        <div className={$['rest-footer']}>
          {routes.map((route) => {
            const isActive =
              pathname.includes(route.href) || pathname === route.href;
            return (
              <NavigationLink
                key={route.id}
                label={`${route.label}버튼`}
                {...{ route, isActive }}
              />
            );
          })}
        </div>

        <NavigationLink
          {...{ route: uploadRoute }}
          isUpload
          label="upload 버튼"
        />
      </div>
    </footer>
  );
}

export default memo(Footer);
