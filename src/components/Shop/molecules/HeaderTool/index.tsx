import Link from 'next/link';

import { useState } from 'react';

import { FilterType } from '#types/storeType/filter';
import BackBtn from '@atoms/BackBtn';
import Button from '@atoms/Button';
import ErrorFallback from '@atoms/ErrorFallback';
import { Filter, Search } from '@atoms/icon';
import Span from '@atoms/Span';
import SelectBox from '@molecules/SelectBox';
import AsyncBoundary from '@templates/AsyncBoundary';
import FilterSkeleton from '@templates/Skeleton/Filter';
import FilterModal from 'src/components/Shop/Organisms/FilterModal';

import $ from './style.module.scss';

type Props = {
  data: res.CategoryTreeChildren[];
  selectedMenu: string;
  isSelectedSub: boolean;
  breadCrumb: string;
  mainCategory: FilterType;
  isRecommend: boolean;
  onClick: (value: string) => void;
};

function HeaderTool(headerProps: Props) {
  const { data, selectedMenu, onClick, isRecommend } = headerProps;
  const { isSelectedSub, breadCrumb, mainCategory } = headerProps;
  const [filterOpen, setFilterOpen] = useState(false);

  const openFilterModal = () => {
    setFilterOpen(true);
  };
  const closeFilterModal = () => setFilterOpen(false);

  return (
    <section className={$['tool-container']}>
      {isSelectedSub && <BackBtn color="#000" className={$['back-btn']} />}
      <Span
        fontSize={20}
        fontWeight={700}
        isStrongFontFamily
        className={$.logo}
      >
        {!isSelectedSub ? 're:Fashion' : breadCrumb}
      </Span>

      <section className={$['header-tool']}>
        {!isSelectedSub && (
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

        <Link href="/search">
          <button
            type="button"
            aria-label="상품 검색 버튼"
            className={$.search}
          >
            <Search />
          </button>
        </Link>

        {!isRecommend && (
          <AsyncBoundary
            suspenseFallback={<FilterSkeleton />}
            errorFallback={ErrorFallback}
          >
            <Button
              iconBtn
              label="상품 필터 버튼"
              className={$.filter}
              onClick={openFilterModal}
            >
              <Filter fill="#C9B6FF" stroke="#936DFF" />
            </Button>
            <FilterModal
              {...{ mainCategory }}
              isOpen={filterOpen}
              onClose={closeFilterModal}
            />
          </AsyncBoundary>
        )}
      </section>
    </section>
  );
}

export default HeaderTool;
