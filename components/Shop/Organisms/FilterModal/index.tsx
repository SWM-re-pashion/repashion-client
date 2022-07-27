import { useEffect, useState } from 'react';

import PageLayout from '@templates/Layout';
import { Modal } from '@templates/Modal';
import FilterHeader from 'components/Shop/molecules/FilterHeader';

import $ from './style.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function FilterModal({ isOpen, onClose }: Props) {
  return (
    <Modal id="filter-modal" open={isOpen}>
      <div className={$['filter-modal']} aria-describedby="필터 페이지">
        <PageLayout noPadding>
          <FilterHeader onClose={onClose} />
        </PageLayout>
      </div>
    </Modal>
  );
}
