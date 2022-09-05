import { useState } from 'react';

import { QueryChange } from '#types/index';
import { Filter, Search } from '@atoms/icon';
import Span from '@atoms/Span';
import SelectBox from '@molecules/SelectBox';
import FilterModal from 'components/Shop/Organisms/FilterModal';

import $ from './style.module.scss';

type Props = {
  data: res.CategoryTreeChildren[];
  selectedMenu: string;
  onClick: QueryChange;
};

function HeaderTool(headerProps: Props) {
  const { data, selectedMenu, onClick } = headerProps;
  const [filterOpen, setFilterOpen] = useState(false);

  const openFilterModal = () => {
    setFilterOpen(true);
  };
  const closeFilterModal = () => setFilterOpen(false);

  return (
    <section className={$['tool-container']}>
      <Span
        fontSize={20}
        fontWeight={700}
        isStrongFontFamily
        className={$.logo}
      >
        re:Fashion
      </Span>

      <section className={$['header-tool']}>
        <SelectBox
          {...{ onQueryChange: onClick }}
          options={data}
          selected={selectedMenu}
          name="gender"
          width="100px"
          height="33px"
          fontWeight={700}
          isGender
          hasId
        />

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
