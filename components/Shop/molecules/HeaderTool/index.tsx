import { useState } from 'react';

import { QueryChange } from '#types/index';
import BackBtn from '@atoms/BackBtn';
import { Filter, Search } from '@atoms/icon';
import Span from '@atoms/Span';
import SelectBox from '@molecules/SelectBox';
import FilterModal from 'components/Shop/Organisms/FilterModal';

import $ from './style.module.scss';

type Props = {
  data: res.CategoryTreeChildren[];
  selectedMenu: string;
  isSeletedSub: boolean;
  breadCrumb: string;
  onClick: QueryChange;
};

function HeaderTool(headerProps: Props) {
  const { data, selectedMenu, onClick, isSeletedSub, breadCrumb } = headerProps;
  const [filterOpen, setFilterOpen] = useState(false);

  const openFilterModal = () => {
    setFilterOpen(true);
  };
  const closeFilterModal = () => setFilterOpen(false);

  return (
    <section className={$['tool-container']}>
      {isSeletedSub && <BackBtn color="#000" className={$['back-btn']} />}
      <Span
        fontSize={20}
        fontWeight={700}
        isStrongFontFamily
        className={$.logo}
      >
        {!isSeletedSub ? 're:Fashion' : breadCrumb}
      </Span>

      <section className={$['header-tool']}>
        {!isSeletedSub && (
          <SelectBox
            {...{ onQueryChange: onClick }}
            options={data}
            selected={selectedMenu}
            name="category"
            width="100px"
            height="33px"
            fontWeight={700}
            isGender
            hasId
          />
        )}

        <button
          type="button"
          onClick={openFilterModal}
          className={$['btn-search']}
        >
          <Search />
        </button>

        <button type="button" onClick={openFilterModal} className={$.btn}>
          <Filter />
        </button>
        <FilterModal isOpen={filterOpen} onClose={closeFilterModal} />
      </section>
    </section>
  );
}

export default HeaderTool;