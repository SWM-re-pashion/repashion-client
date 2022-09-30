import { useEffect, useMemo, useState } from 'react';

import { DefaultProps } from '#types/props';
import { Portal } from '@templates/Portal';

import $ from './style.module.scss';

type Props = {
  id: string;
  isOpen: boolean;
  onClose?: () => void;
} & DefaultProps;

export function Modal({
  id,
  isOpen,
  children,
  onClose,
}: Props): React.ReactElement | null {
  const portalId = useMemo(() => `modal-${id}`, [id]);
  const [container, setContainer] = useState<Element | null>(null);

  useEffect(() => {
    const newContainer = document.createElement('div');
    newContainer.setAttribute('id', portalId);
    document.body.appendChild(newContainer);

    setContainer(newContainer);

    return () => {
      const containerDOM = document.getElementById(portalId);
      containerDOM?.remove();
    };
  }, [portalId]);

  useEffect(() => {
    function onKeyDownESC(e: KeyboardEvent) {
      if (e.key === 'Escape' && onClose) onClose();
    }
    document.addEventListener('keydown', onKeyDownESC);

    return () => {
      document?.removeEventListener('keydown', onKeyDownESC);
    };
  }, [onClose]);

  if (!isOpen) return null;
  return (
    <Portal container={container}>
      <div className={$['modal-wrapper']}>
        <div role="presentation" className={$.overlay} onClick={onClose} />
        <div role="dialog" aria-label="모달" className={$.content}>
          {children}
        </div>
      </div>
    </Portal>
  );
}
