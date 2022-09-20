import { memo, useRef, useState } from 'react';

import { DefaultData } from '#types/index';
import Button from '@atoms/Button';
import { SelectArrow } from '@atoms/icon';
import MenuBtn from '@molecules/MenuBtn';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props = {
  data: DefaultData[];
  selectedMenu: string;
  onClick: (value?: string) => void;
  isSeletedSub: boolean;
};

function CategoryBox({ data, selectedMenu, isSeletedSub, onClick }: Props) {
  const [isClicked, setClicked] = useState(false);
  const btnBoxRef = useRef<HTMLDivElement>(null);

  const handleClick = () => setClicked((clicked) => !clicked);

  return (
    <section
      ref={btnBoxRef}
      className={classnames([$['main-box']], { [$['sub-box']]: isSeletedSub })}
    >
      <div
        className={classnames([$['category-list']], {
          [$['category-list-clicked']]: isClicked,
        })}
      >
        {data.map(({ id, name }) => {
          const isSelected = selectedMenu === id;

          return (
            <MenuBtn value={id} key={name} {...{ name, onClick, isSelected }} />
          );
        })}
      </div>

      <Button
        iconBtn
        className={classnames($.arrow, {
          [$['arrow-clicked']]: isClicked,
        })}
        onClick={handleClick}
      >
        <SelectArrow />
      </Button>
    </section>
  );
}

export default memo(CategoryBox);
