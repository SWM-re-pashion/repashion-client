import { useEffect, useMemo, useState } from 'react';

import { DefaultProps } from '#types/props';
import { Portal } from '@templates/Portal';

type Props = {
  id: string;
  open: boolean;
} & DefaultProps;

export function Modal({
  id,
  open,
  children,
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

  if (!open) return null;
  return <Portal container={container}>{children}</Portal>;
}
