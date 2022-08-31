import { memo, useCallback } from 'react';

import { UpdateUpload, UploadState } from '#types/storeType/upload';
import Button from '@atoms/Button';
import { SelectArrow } from '@atoms/icon';
import TextInput from '@atoms/TextInput';
import InfoArticle from '@molecules/InfoArticle';
import useDebounceInput from 'hooks/useDebounceInput';

import Dialog from '../Dialog';
import $ from './style.module.scss';

type Props = {
  dialogOpen: boolean;
  state: UploadState['basicInfo'];
  categoryData: res.CategoryTree | undefined;
  onChange: UpdateUpload;
  openDialog: () => void;
  closeDialog: () => void;
};

function Basic(basicProps: Props) {
  const { dialogOpen, state, openDialog, onChange, closeDialog, categoryData } =
    basicProps;
  const [gender, main, sub] = state.category;
  const categoryBtnText =
    gender && main && sub
      ? `${gender} | ${main} | ${sub}`.toString()
      : '카테고리 선택';
  const handleInput = useDebounceInput(onChange, 200);

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      handleInput(e.target.value, 'basicInfo', 'title'),
    [handleInput],
  );

  const handleBrandChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      handleInput(e.target.value, 'basicInfo', 'brand'),
    [handleInput],
  );

  return (
    <InfoArticle label="아이템 기본 정보" required className={$['basic-info']}>
      <TextInput
        label="아이템"
        className={$.title}
        controlled={false}
        value={state.title}
        placeholder="아이템 이름"
        onChange={handleTitleChange}
      />

      <Button
        background="#fff"
        color="#000"
        fontWeight={400}
        className={$['open-dialog']}
        onClick={openDialog}
        label="카테고리 다이얼로그 열기"
      >
        {categoryBtnText}
        <SelectArrow className={$.icon} />
      </Button>
      <Dialog
        data={categoryData}
        state={state}
        isOpen={dialogOpen}
        onClose={closeDialog}
        onChange={onChange}
      />

      <TextInput
        label="브랜드"
        className={$.title}
        controlled={false}
        value={state.brand}
        placeholder="브랜드 이름"
        onChange={handleBrandChange}
      />
    </InfoArticle>
  );
}

export default memo(Basic);
