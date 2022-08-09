import Label from '@atoms/Label';
import { category } from '@mocks/category';
import { Modal } from '@templates/Modal';
import { deepClone } from 'utils';
import { deepMerge } from 'utils/deepMerge';

import $ from './style.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function Dialog({ onClose }: { onClose: () => void }) {
  const genders = category;
  const common = genders.children.find((gender) => gender.name === '공용');
  const filteredCategory = (code: string, name: string) => {
    const genderData = genders?.children.find((gender) => gender.code === code);
    // const mergedCategory = common?.children.reduce(
    //   (acc, cur, _, origin) => {
    //     let isIncludeSameName = false;
    //     const commonClone = deepClone(cur);
    //     genderData?.children.forEach((data) => {
    //       if (data.name === cur.name) {
    //         commonClone.children = [...cur.children, ...data.children];
    //         if (!isIncludeSameName) isIncludeSameName = true;
    //       }
    //       if (!origin.includes(data)) acc?.children.push(deepClone(data));
    //     });
    //     acc?.children.push(commonClone);
    //     return acc;
    //   },
    //   { name, code, children: [] },
    // );
    // console.log(common);
    const mergedCategory = deepClone(
      deepMerge(common?.children, genderData?.children),
    );
    return mergedCategory;
  };
  //   console.log(filteredCategory('men', '남성'));

  return (
    <div className={$['dialog-body']}>
      <Label>카테고리 선택</Label>
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
          <Label>카테고리 선택</Label>
        </header>
        <Dialog onClose={onClose} />
      </div>
    </Modal>
  );
}
