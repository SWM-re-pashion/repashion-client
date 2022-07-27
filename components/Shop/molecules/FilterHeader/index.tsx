import { Close } from '@atoms/icon';

import $ from './style.module.scss';

type Props = {
  onClose: () => void;
};

export default function FilterHeader({ onClose }: Props) {
  return (
    <header className={$['filter-header']}>
      <button
        type="button"
        onClick={onClose}
        className={$['filter-close']}
        aria-label="필터 닫기"
      >
        <Close />
      </button>
      <h1 className={$.title}>필터</h1>
    </header>
  );
}
