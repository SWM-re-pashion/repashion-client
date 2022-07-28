import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import { ClothesCategory } from '#types/info';
import InfoBtnBox from '@organisms/InfoBtnBox';
import Layout from '@templates/Layout';
import { Modal } from '@templates/Modal';
import FilterHeader from 'components/Shop/molecules/FilterHeader';
import { useFilterStore } from 'store/useFilterStore';
import { filterData } from 'utils';

import $ from './style.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function FilterModal({ onClose }: { onClose: () => void }) {
  const states = useFilterStore((state) => state);
  const { query } = useRouter();
  const category = decodeURI(decodeURIComponent(query.category as string));

  return (
    <>
      <FilterHeader onClose={onClose} />

      <div className={$['filter-container']}>
        {filterData(category).map((options) => {
          const compareData: string[] =
            options.type !== 'styles' && options.subType
              ? states[options.type][options.subType]
              : (states[options.type] as string[]); // Todo: 타입 단언 제거

          return (
            <InfoBtnBox
              {...options}
              key={options.label}
              compareData={compareData}
              // handleFunc={updateInfo}
            />
          );
        })}
      </div>
    </>
  );
}

export default function FilterModalWrapper({ isOpen, onClose }: Props) {
  return (
    <Modal id="filter-modal" open={isOpen}>
      <div className={$['filter-modal']} aria-describedby="필터 페이지">
        <Layout noPadding>
          <FilterModal onClose={onClose} />
        </Layout>
      </div>
    </Modal>
  );
}
