import { useRouter } from 'next/router';

import { ReactElement, useState } from 'react';

import { Filter } from '@atoms/icon';
import Layout from '@templates/Layout';
import FilterModal from 'components/Shop/Organisms/FilterModal';

import $ from './style.module.scss';

function Shop() {
  const [filterOpen, setFilterOpen] = useState(false);
  const router = useRouter();
  const openFilterModal = () => {
    setFilterOpen(true);
    router.push(`?category=${encodeURI(encodeURIComponent('bottom'))}`);
  };
  const closeFilterModal = () => setFilterOpen(false);

  return (
    <div>
      <button type="button" onClick={openFilterModal}>
        <Filter />
      </button>
      <FilterModal isOpen={filterOpen} onClose={closeFilterModal} />
    </div>
  );
}

Shop.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Shop;
