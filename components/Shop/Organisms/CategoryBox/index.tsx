import { useRef } from 'react';

import { DefaultData } from '#types/index';
import Button from '@atoms/Button';
import classnames from 'classnames';
import { useDragScroll } from 'hooks';

import $ from './style.module.scss';

type Props = {
  data: DefaultData[];
  selectedMenu: string;
  isMain: boolean;
};

function CategoryBox({ data, selectedMenu, isMain }: Props) {
  const btnBoxRef = useRef<HTMLDivElement>(null);
  useDragScroll(btnBoxRef);

  return (
    <section
      ref={btnBoxRef}
      className={classnames(
        { [$['main-box']]: isMain },
        { [$['sub-box']]: !isMain },
      )}
    >
      {data.map(({ name, code }) => {
        const isSelected = selectedMenu === code;
        const isMainSelected = isSelected && isMain;
        const isSubSelected = isSelected && !isMain;
        const subSelectedColor = isSubSelected ? '#936DFF' : '#000';

        return (
          <Button
            key={name}
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

export default CategoryBox;
