import { useRouter } from 'next/router';

import { memo } from 'react';

import { Chat, Shop, MyPage, Plus, SearchBlack } from '@atoms/icon';
import NavigationLink from '@molecules/NavigationLink';

import $ from './style.module.scss';

function Footer() {
  const { pathname } = useRouter();

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
    {
      id: 3,
      icon: Chat,
      label: 'chat',
      href: '/chat',
    },
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
      <div className={$['footer-wrapper']}>
        <div className={$['rest-footer']}>
          {routes.map((route) => {
            const isActive =
              pathname.includes(route.href) || pathname === route.href;
            return <NavigationLink key={route.id} {...{ route, isActive }} />;
          })}
        </div>

        <NavigationLink {...{ route: uploadRoute }} isUpload />
      </div>
    </footer>
  );
}

export default memo(Footer);
