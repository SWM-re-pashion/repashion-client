import { memo, useRef, useState } from 'react';

import { DefaultData } from '#types/index';
import Button from '@atoms/Button';
import { SelectArrow } from '@atoms/icon';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props = {
  data: DefaultData[];
  selectedMenu: string;
  onClick: (value: string) => void;
  isSeletedSub: boolean;
};

function CategoryBox({ data, selectedMenu, isSeletedSub, onClick }: Props) {
  const [isClicked, setClicked] = useState(false);
  const btnBoxRef = useRef<HTMLDivElement>(null);

  const handleClick = () => setClicked((clicked) => !clicked);

  return (
    <section
      ref={btnBoxRef}
      className={classnames(
        [$['main-box']],
        { [$['sub-box']]: isSeletedSub },
        { [$['box-clicked']]: isClicked },
      )}
    >
      <Button
        iconBtn
        className={classnames($.arrow, {
          [$['arrow-clicked']]: isClicked,
        })}
        onClick={handleClick}
      >
        <SelectArrow />
      </Button>

      {data.map(({ id, name }) => {
        const isSelected = selectedMenu === id;

        return (
          <Button
            {...{ onQueryClick: onClick }}
            key={name}
            label={`${name} 선택 버튼`}
            value={id}
            background={isSelected ? '#936DFF' : 'transparent'}
            color={isSelected ? '#fff' : '#000'}
            borderRadius="8px"
            className={$.btn}
          >
            {name}
          </Button>
        );
      })}
    </section>
  );
}

export default memo(CategoryBox);
