import { memo, useRef } from 'react';

import { DefaultData } from '#types/index';
import MenuBtn from '@molecules/MenuBtn';
import { useDragScroll } from 'src/hooks';

import $ from './style.module.scss';

type Props = {
  data: DefaultData[];
  selectedMenu: string;
  onClick: (value?: string) => void;
};

function StatusMenuList(listProps: Props) {
  const { data, selectedMenu, onClick } = listProps;
  const listRef = useRef<HTMLDivElement | null>(null);
  useDragScroll(listRef);

  return (
    <div className={$['status-menu-list']} ref={listRef}>
      {data.map(({ name, code }) => {
        const isSelected = selectedMenu === code;

        return (
          <MenuBtn
            value={code}
            key={name}
            {...{ name, onClick, isSelected }}
            className={$['menu-btn']}
          />
        );
      })}
    </div>
  );
}

export default memo(StatusMenuList);
