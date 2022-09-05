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
  isMain: boolean;
};

function CategoryBox({ data, selectedMenu, isMain, onClick }: Props) {
  const btnBoxRef = useRef<HTMLDivElement>(null);
  const queryName = isMain ? 'main' : 'sub';
  useDragScroll(btnBoxRef);

  return (
    <section
      ref={btnBoxRef}
      className={classnames(
        { [$['main-box']]: isMain },
        { [$['sub-box']]: !isMain },
      )}
    >
      {data.map(({ id, name }) => {
        const isSelected = selectedMenu === id;
        const isMainSelected = isSelected && isMain;
        const isSubSelected = isSelected && !isMain;
        const subSelectedColor = isSubSelected ? '#936DFF' : '#000';

        return (
          <Button
            {...{ onQueryClick: onClick, queryName }}
            key={name}
            label={`${name} 선택 버튼`}
            queryCode={id}
            background={isMainSelected ? '#936DFF' : 'transparent'}
            color={isMainSelected ? '#fff' : subSelectedColor}
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
