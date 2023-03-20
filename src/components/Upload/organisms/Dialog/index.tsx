import { memo, useEffect } from 'react';

import { BasicInfo, UpdateUpload } from '#types/storeType/upload';
import Button from '@atoms/Button';
import Span from '@atoms/Span';
import ButtonFooter from '@molecules/ButtonFooter';
import RadioSelect from '@molecules/RadioSelect';
import Modal from '@templates/Modal';

import $ from './style.module.scss';
import { curCategoryChildrenByProp } from './utils';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  categoryData: res.CategoryTree['data'];
  state: BasicInfo;
  onChange: UpdateUpload;
};

function Dialog(dialogProps: Omit<Props, 'isOpen'>) {
  const { state, onChange, onClose } = dialogProps;
  const { categoryData } = dialogProps;
  const { category, curCategoryIdx } = state;
  const isIncludeCurValue = categoryData
    ? curCategoryChildrenByProp(categoryData, 'id').includes(
        category[curCategoryIdx],
      )
    : false;
  const isCurValueExist = !!category[curCategoryIdx] && isIncludeCurValue;
  const isValidPrevBtn = curCategoryIdx !== 0 && category[curCategoryIdx - 1];
  const lastBtnText = curCategoryIdx === category.length - 1 ? '완료' : '다음';
  const pageNum = `${curCategoryIdx + 1}/${category.length}`;

  useEffect(() => {
    return () => {
      onChange(0, 'basicInfo', 'curCategoryIdx');
    };
  }, [onChange]);

  const prevBtn = (idx: number) => {
    if (idx === 0) return;
    onChange(idx - 1, 'basicInfo', 'curCategoryIdx');
  };

  const nextBtn = (idx: number) => {
    if (idx === 2) {
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
          {categoryData?.name}
        </Span>
        <Span color="#6A6A6A" className={$['page-num']}>
          {pageNum}
        </Span>
      </header>

      <div className={$['dialog-body']}>
        <div className={$['radio-group']}>
          {categoryData?.children.map(({ id, name }) => {
            const isClicked = category[curCategoryIdx] === id;
            return (
              <RadioSelect
                key={id}
                isBorder
                isClicked={isClicked}
                type="basicInfo"
                subType="category"
                idx={curCategoryIdx}
                {...{ name, selectedValue: id, onSubTypeClick: onChange }}
              />
            );
          })}
        </div>

        <ButtonFooter
          disabled={!isCurValueExist}
          LeftBtn={
            <Button
              className={$.prev}
              disabled={!isValidPrevBtn}
              onClick={() => prevBtn(curCategoryIdx)}
            >
              이전
            </Button>
          }
          onClick={() => nextBtn(curCategoryIdx)}
        >
          {lastBtnText}
        </ButtonFooter>
      </div>
    </>
  );
}

function DialogWrapper(dialogProps: Props) {
  const { isOpen, onClose, state, onChange } = dialogProps;
  const { categoryData } = dialogProps;
  return (
    <Modal id="category-dialog" {...{ isOpen, onClose }}>
      <div
        className={$['category-dialog']}
        aria-describedby="카테고리 다이얼로그"
      >
        <Dialog
          {...{
            state,
            onChange,
            onClose,
            categoryData,
          }}
        />
      </div>
    </Modal>
  );
}

export default memo(DialogWrapper);
