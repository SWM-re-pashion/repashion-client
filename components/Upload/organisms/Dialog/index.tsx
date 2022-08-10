import Span from '@atoms/Span';
import { category } from '@mocks/category';
import RadioSelect from '@molecules/RadioSelect';
import { Modal } from '@templates/Modal';

import $ from './style.module.scss';
import { filteredCategory } from './utils';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function Dialog() {
  const genderCategory = category;
  console.log(filteredCategory(category, '여성', 'women'));

  return (
    <div className={$['dialog-body']}>
      <Span>카테고리 선택</Span>
      <Span>{genderCategory.name}</Span>
      <div>
        {genderCategory.children.map(({ name, code }) => {
          return <RadioSelect label={name} />;
        })}
      </div>
    </div>
  );
}

export default function DialogWrapper({ isOpen, onClose }: Props) {
  return (
    <Modal id="category-dialog" {...{ isOpen, onClose }}>
      <div
        className={$['category-dialog']}
        aria-describedby="카테고리 다이얼로그"
      >
        <header className={$['dialog-header']}>
          <Span>카테고리 선택</Span>
        </header>
        <Dialog />
      </div>
    </Modal>
  );
}
