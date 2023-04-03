import { useState, useCallback } from 'react';

import { useTabIndex } from 'src/store/useTabIndex';

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const setTabIndex = useTabIndex((state) => state.setTabIndex);

  const handleModalOpen = useCallback(() => {
    setIsOpen(true);
    setTabIndex(-1);
  }, [setTabIndex]);
  const handleModalClose = useCallback(() => {
    setIsOpen(false);
    setTabIndex(0);
  }, [setTabIndex]);

  return { isOpen, handleModalClose, handleModalOpen };
}
