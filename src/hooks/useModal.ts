import { useState, useCallback } from 'react';

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = useCallback(() => {
    setIsOpen(true);
  }, []);
  const handleModalClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, handleModalClose, handleModalOpen };
}
