import { memo, useRef } from 'react';

import { DefaultData } from '#types/index';
import { NoService } from '@atoms/icon';
import MenuBtn from '@molecules/MenuBtn';
import ProductItemList from 'src/components/Shop/Organisms/ProductItemList';
import { useDragScroll, useSearch } from 'src/hooks';

import $ from './style.module.scss';

type Props = {
  isMe: boolean;
  data: DefaultData[];
  selectedMenu: string;
  onClick: (value?: string) => void;
};

function StatusMenuList(listProps: Props) {
  const { isMe, data, selectedMenu, onClick } = listProps;
  const listRef = useRef<HTMLDivElement | null>(null);
  const status = useSearch('status') || data[0].code;
  useDragScroll(listRef);

  return (
    <>
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
      {isMe ? (
        <ProductItemList
          queryStringObj={{ status }}
          paddingTop="0"
          type="mypage"
          height="calc(var(--vh, 1vh) * 100 - 329px)"
        />
      ) : (
        <div className={$.prepare}>
          <NoService />
        </div>
      )}
    </>
  );
}

export default memo(StatusMenuList);
