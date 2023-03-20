import { ReactPortal, ReactNode } from 'react';
import ReactDOM from 'react-dom';

export interface PortalProps {
  children: ReactNode;
  container: Element | null;
}

export function Portal({
  children,
  container,
}: PortalProps): ReactPortal | null {
  if (!container) return null;
  return ReactDOM.createPortal(children, container);
}
