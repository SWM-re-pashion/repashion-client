import { useEffect, useState } from 'react';

import PageLayout from '@templates/Layout';
import { Modal } from '@templates/Modal';

import $ from './style.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function FilterModal({ isOpen, onClose }: Props) {
  return (
    <Modal id="filter-modal" open={isOpen}>
      <div className={$['filter-modal']} aria-describedby="필터 페이지">
        <PageLayout>
          <button type="button" onClick={onClose}>
            닫기
          </button>
          <span>Filter</span>
        </PageLayout>
      </div>
    </Modal>
  );
}
