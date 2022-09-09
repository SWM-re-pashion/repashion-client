import { memo, useRef } from 'react';

import { DefaultData, QueryChange } from '#types/index';
import Button from '@atoms/Button';
import classnames from 'classnames';
import { useDragScroll } from 'hooks';

import $ from './style.module.scss';

type Props = {
  data: DefaultData[];
  selectedMenu: string;
  onClick: QueryChange;
  isSeletedSub: boolean;
};

function CategoryBox({ data, selectedMenu, isSeletedSub, onClick }: Props) {
  const btnBoxRef = useRef<HTMLDivElement>(null);
  useDragScroll(btnBoxRef);

  return (
    <section
      ref={btnBoxRef}
      className={classnames([$['main-box']], { [$['sub-box']]: isSeletedSub })}
    >
      {data.map(({ id, name }) => {
        const isSelected = selectedMenu === id;

        return (
          <Button
            {...{ onQueryClick: onClick }}
            queryName="category"
            key={name}
            label={`${name} 선택 버튼`}
            queryCode={id}
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
