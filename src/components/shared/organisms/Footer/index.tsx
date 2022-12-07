import { useRouter } from 'next/router';

import { memo, useEffect, useState } from 'react';

import { Shop, MyPage, Plus, Home } from '@atoms/icon';
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
      icon: Home,
      label: 'home',
      href: '/',
    },
    {
      id: 2,
      icon: Shop,
      label: 'shop',
      href: '/shop',
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

  const isActiveCondition = (path: string, currentPath: string) =>
    (!path.includes('/') && path.includes(currentPath)) || path === currentPath;

  return (
    <footer className={$.footer}>
      <div className={classnames($['footer-wrapper'], { [$.down]: isDown })}>
        <div className={$['rest-footer']}>
          {routes.map((route) => (
            <NavigationLink
              key={route.id}
              label={`${route.label}버튼`}
              {...{
                route,
                isActive: isActiveCondition(pathname, route.href),
              }}
            />
          ))}
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
