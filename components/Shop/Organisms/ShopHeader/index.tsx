import { useState } from 'react';

import { Filter, Search } from '@atoms/icon';
import Span from '@atoms/Span';
import SelectBox from '@molecules/SelectBox';
import FilterModal from 'components/Shop/Organisms/FilterModal';

import $ from './style.module.scss';

type Props = {
  data: string[];
  seletedMenu: string;
  onChange: () => void;
};

function ShopHeader({ data, seletedMenu, onChange }: Props) {
  const [filterOpen, setFilterOpen] = useState(false);

  const openFilterModal = () => {
    setFilterOpen(true);
  };
  const closeFilterModal = () => setFilterOpen(false);

  return (
    <header className={$.header}>
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
          {...{ onChange }}
          options={data}
          selected={seletedMenu}
          name="gender"
          width="100px"
          height="33px"
          isGender
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
    </header>
  );
}

export default ShopHeader;
