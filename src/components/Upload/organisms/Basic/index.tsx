import { memo, useCallback, useState } from 'react';

import { UpdateUpload, UploadState } from '#types/storeType/upload';
import Button from '@atoms/Button';
import ErrorMsg from '@atoms/ErrorMsg';
import { SelectArrow } from '@atoms/icon';
import TextInput from '@atoms/TextInput';
import InfoArticle from '@molecules/InfoArticle';
import { getBreadcrumb, getCategoryTree } from 'src/api/category';
import useDebounceInput from 'src/hooks/useDebounceInput';

import Dialog from '../Dialog';
import { dialogCategoryProps } from '../Dialog/utils';
import $ from './style.module.scss';

type Props = {
  state: UploadState['basicInfo'];
  categoryData: res.CategoryTree['data'];
  onChange: UpdateUpload;
  isBasicValid: boolean;
};

function Basic(basicProps: Props) {
  const { state, onChange } = basicProps;
  const { category, curCategoryIdx } = state;
  const { categoryData, isBasicValid } = basicProps;

  const [dialogOpen, setDialogOpen] = useState(false);
  const openDialog = useCallback(() => setDialogOpen(true), []);
  const closeDialog = useCallback(() => setDialogOpen(false), []);

  const isAllCategorySelected = category.every((x) => !!x);
  const prevCategoryId = category[curCategoryIdx - 1] || '';
  const lastCategory = category[category.length - 1];

  const categories = getCategoryTree(categoryData, prevCategoryId);
  const breadCrumb = getBreadcrumb(categoryData, lastCategory);

  const categoryDatas = {
    ...dialogCategoryProps(curCategoryIdx),
    children: categories,
  };

  const categoryBtnText = isAllCategorySelected ? breadCrumb : '카테고리 선택';
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
    <InfoArticle
      label="아이템 기본 정보"
      description="이미지를 올리면 카테고리를 자동으로 채워줘요."
      required
      className={$['basic-info']}
    >
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
        {...{ categoryData: categoryDatas }}
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

      <ErrorMsg
        isValid={isBasicValid}
        msg="아이템 이름, 카테고리, 브랜드를 알려주세요."
      />
    </InfoArticle>
  );
}

export default memo(Basic);
