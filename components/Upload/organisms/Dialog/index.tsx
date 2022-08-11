import { useEffect, useState } from 'react';

import { BasicInfo, UpdateUpload } from '#types/storeType/upload';
import Button from '@atoms/Button';
import ButtonFooter from '@atoms/ButtonFooter';
import Span from '@atoms/Span';
import { categoryData } from '@mocks/categoryData';
import RadioSelect from '@molecules/RadioSelect';
import { Modal } from '@templates/Modal';

import $ from './style.module.scss';
import { categoryProperty, filteredCategory, findChildren } from './utils';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  data: BasicInfo;
  onChange: UpdateUpload;
};

function Dialog(dialogProps: Pick<Props, 'data' | 'onChange'>) {
  const { data, onChange } = dialogProps;
  const { category, currentCategoryIdx } = data;
  const [currentCategory, setCurrentCategory] = useState(categoryData);
  const mainCategory = filteredCategory(category[0], categoryData);

  useEffect(() => {
    return () => {
      onChange(0, 'basicInfo', 'currentCategoryIdx');
    };
  }, []);

  const prevBtn = (idx: number) => {
    if (idx === 1) {
      setCurrentCategory(categoryData);
    } else if (idx === 2) {
      setCurrentCategory({
        ...categoryProperty(idx - 1),
        children: mainCategory,
      });
    } else {
      return;
    }
    onChange(idx - 1, 'basicInfo', 'currentCategoryIdx');
  };

  const nextBtn = (idx: number) => {
    if (idx === 0) {
      setCurrentCategory({
        ...categoryProperty(idx + 1),
        children: mainCategory,
      });
    } else if (idx === 1) {
      setCurrentCategory({
        ...categoryProperty(idx + 1),
        children:
          findChildren(mainCategory, category[currentCategoryIdx]) || [],
      });
    } else {
      return;
    }
    onChange(idx + 1, 'basicInfo', 'currentCategoryIdx');
  };

  return (
    <>
      <header className={$['dialog-header']}>
        <Span className={$.title}>카테고리 선택</Span>
        <Span fontSize={12} fontWeight={500}>
          {currentCategory.name}
        </Span>
        <Span color="#6A6A6A" className={$['page-num']}>
          {currentCategoryIdx + 1}/{category.length}
        </Span>
      </header>

      <div className={$['dialog-body']}>
        <div className={$['radio-group']}>
          {currentCategory.children.map(({ name, code }) => {
            return (
              <RadioSelect
                key={code}
                isBorder
                isClicked={category[currentCategoryIdx] === code}
                type="basicInfo"
                subType="category"
                idx={currentCategoryIdx}
                {...{ name, code, onSubTypeClick: onChange }}
              />
            );
          })}
        </div>

        <ButtonFooter
          onClick={() => nextBtn(currentCategoryIdx)}
          LeftBtn={
            <Button
              className={$.prev}
              onClick={() => prevBtn(currentCategoryIdx)}
            >
              이전
            </Button>
          }
        >
          다음
        </ButtonFooter>
      </div>
    </>
  );
}

export default function DialogWrapper(dialogProps: Props) {
  const { isOpen, onClose, data, onChange } = dialogProps;
  return (
    <Modal id="category-dialog" {...{ isOpen, onClose }}>
      <div
        className={$['category-dialog']}
        aria-describedby="카테고리 다이얼로그"
      >
        <Dialog {...{ data, onChange }} />
      </div>
    </Modal>
  );
}
