import { useRef } from 'react';

import { DefaultData, QueryChange } from '#types/index';
import Span from '@atoms/Span';
import CheckBtn from '@molecules/CheckBtn';
import SelectBox from '@molecules/SelectBox';
import { useDragScroll } from 'hooks';

import $ from './style.module.scss';

type Props = {
  data: DefaultData[];
  hideSold: string;
  selectedMenu: string;
  onClick: QueryChange;
};

function SortBox({ data, selectedMenu, hideSold, onClick }: Props) {
  const btnBoxRef = useRef<HTMLDivElement>(null);
  useDragScroll(btnBoxRef);

  const isHideSold = hideSold === 'true';
  const handleClick = () => onClick('hideSold', (!isHideSold).toString());

  return (
    <section ref={btnBoxRef} className={$['sort-box']}>
      <div
        role="button"
        tabIndex={0}
        className={$['check-box']}
        onClick={handleClick}
        onKeyDown={handleClick}
        aria-label="거래완료 숨기기 버튼"
      >
        <CheckBtn isChecked={isHideSold} />
        <Span fontSize={14} className={$['check-box-label']}>
          거래완료 숨기기
        </Span>
      </div>
      <SelectBox
        {...{ onQueryChange: onClick }}
        options={data}
        selected={selectedMenu}
        name="order"
        width="110px"
        height="24px"
        fontSize={14}
        fontWeight={700}
      />
    </section>
  );
}

export default SortBox;
