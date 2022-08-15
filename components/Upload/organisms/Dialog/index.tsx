import { useEffect, useState } from 'react';

import { BasicInfo, UpdateUpload } from '#types/storeType/upload';
import Button from '@atoms/Button';
import ButtonFooter from '@atoms/ButtonFooter';
import Span from '@atoms/Span';
import { categoryData } from '@mocks/categoryData';
import RadioSelect from '@molecules/RadioSelect';
import { Modal } from '@templates/Modal';

import $ from './style.module.scss';
import {
  categoryProps,
  curCategoryChildren,
  filteredCategory,
  findChildren,
} from './utils';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  data: BasicInfo;
  onChange: UpdateUpload;
};

function Dialog(dialogProps: Pick<Props, 'data' | 'onChange' | 'onClose'>) {
  const { data, onChange, onClose } = dialogProps;
  const { category, curCategoryIdx } = data;
  const [gender] = category;
  const [curCategory, setCurCategory] = useState(categoryData);
  const mainCategory = filteredCategory(gender, categoryData);

  const isIncludeCurValue = curCategoryChildren(curCategory).includes(
    category[curCategoryIdx],
  );
  const isCurValueExist = !!category[curCategoryIdx] && isIncludeCurValue;
  const isValidPrevBtn = curCategoryIdx !== 0 && category[curCategoryIdx - 1];
  const lastBtnText = curCategoryIdx === category.length - 1 ? '완료' : '다음';
  const pageNum = `${curCategoryIdx + 1}/${category.length}`;
  const prevBtnColor = !isValidPrevBtn ? '#e3e1e1' : '#000';
  const nextBtnColor = !isCurValueExist ? '#e3e1e1' : '#000';

  useEffect(() => {
    return () => {
      onChange(0, 'basicInfo', 'curCategoryIdx');
    };
  }, [onChange]);

  const prevBtn = (idx: number) => {
    if (idx === 1) {
      setCurCategory(categoryData);
    } else if (idx === 2) {
      setCurCategory({
        ...categoryProps(idx - 1),
        children: mainCategory,
      });
    } else {
      return;
    }
    onChange(idx - 1, 'basicInfo', 'curCategoryIdx');
  };

  const nextBtn = (idx: number) => {
    if (idx === 0) {
      setCurCategory({
        ...categoryProps(idx + 1),
        children: mainCategory,
      });
    } else if (idx === 1) {
      const children = findChildren(mainCategory, category[curCategoryIdx]);
      setCurCategory({
        ...categoryProps(idx + 1),
        children,
      });
    } else {
      onClose();
      return;
    }
    onChange(idx + 1, 'basicInfo', 'curCategoryIdx');
  };

  return (
    <>
      <header className={$['dialog-header']}>
        <Span className={$.title}>카테고리 선택</Span>
        <Span fontSize={12} fontWeight={500}>
          {curCategory.name}
        </Span>
        <Span color="#6A6A6A" className={$['page-num']}>
          {pageNum}
        </Span>
      </header>

      <div className={$['dialog-body']}>
        <div className={$['radio-group']}>
          {curCategory.children.map(({ name, code }) => {
            const isClicked = category[curCategoryIdx] === code;
            return (
              <RadioSelect
                key={code}
                isBorder
                isClicked={isClicked}
                type="basicInfo"
                subType="category"
                idx={curCategoryIdx}
                {...{ name, code, onSubTypeClick: onChange }}
              />
            );
          })}
        </div>

        <ButtonFooter
          LeftBtn={
            <Button
              background={prevBtnColor}
              className={$.prev}
              onClick={() => {
                if (isValidPrevBtn) prevBtn(curCategoryIdx);
              }}
            >
              이전
            </Button>
          }
          btnColor={nextBtnColor}
          onClick={() => {
            if (isCurValueExist) nextBtn(curCategoryIdx);
          }}
        >
          {lastBtnText}
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
        <Dialog {...{ data, onChange, onClose }} />
      </div>
    </Modal>
  );
}
