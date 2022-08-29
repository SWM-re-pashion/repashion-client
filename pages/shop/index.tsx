import { useRouter } from 'next/router';

import { ReactElement, useEffect, useState } from 'react';

import HeadMeta from '@atoms/HeadMeta';
import { Filter } from '@atoms/icon';
import { seoData } from '@constants/seo';
import Layout from '@templates/Layout';
import FilterModal from 'components/Shop/Organisms/FilterModal';

import $ from './style.module.scss';

function Shop() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [category, setCategory] = useState('all');
  const router = useRouter(); // query가 이상하면 api 호출 취소하기

  const openFilterModal = () => {
    setFilterOpen(true);
  };
  const closeFilterModal = () => setFilterOpen(false);

  useEffect(() => {
    router.push(
      {
        query: { category },
      },
      undefined,
      { shallow: true },
    );
  }, [category]);

  const categories = ['all', 'top', 'bottom', 'outer'];

  return (
    <>
      <HeadMeta title="re:Fashion | 상품 피드" url={`${seoData.url}/shop`} />

      <div>
        <button type="button" onClick={openFilterModal}>
          <Filter />
        </button>
        <select onChange={(e) => setCategory(e.target.value)}>
          {categories.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <FilterModal isOpen={filterOpen} onClose={closeFilterModal} />
      </div>
    </>
  );
}

Shop.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Shop;
