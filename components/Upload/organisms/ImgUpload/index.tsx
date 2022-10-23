import React, { memo, useCallback, useRef, useState } from 'react';

import {
  ImgList,
  UpdateArr,
  UpdateUpload,
  UploadStoreState,
} from '#types/storeType/upload';
import { getCategoryIds } from 'api/category';
import { useImgUpload } from 'hooks/api/upload';
import useDragScroll from 'hooks/useDragScroll';
import { toastError } from 'utils/toaster';

import { ImgResult } from '../ImgResultModal';
import ImgUploadView from './ImgUploadView';
import { imageList } from './utils';

type Props = {
  isImgValid: boolean;
  state: ImgList[];
  categoryData: res.CategoryTree['data'];
  imgUpload: UploadStoreState['imgUpload'];
  removeImg: UploadStoreState['removeImg'];
  onChange: UpdateUpload;
  updateArr: UpdateArr;
};

function ImgUpload(imgProps: Props) {
  const { onChange, imgUpload, removeImg, updateArr } = imgProps;
  const { state, isImgValid, categoryData } = imgProps;
  const [imgResult, setImgResult] = useState<ImgResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadRef = useRef<HTMLDivElement>(null);
  const { isLoading, mutate } = useImgUpload();
  useDragScroll(uploadRef);

  const onUploadClick = useCallback(() => {
    if (inputRef.current) inputRef.current.click();
  }, []);

  const onUploadImg = useCallback(
    (e: React.ChangeEvent) => {
      const formData = new FormData();
      if (e.type === 'change' && 'files' in e.target) {
        const {
          target: { files },
        } = e;
        if (files) {
          const filesArr: File[] = Array.from(files);
          if (filesArr.length > 10) {
            filesArr.splice(10);
            toastError({ message: '이미지는 최대 10개까지 올릴 수 있습니다.' });
          }
          filesArr.forEach((file: File) => {
            formData.append('files', file);
          });
          mutate(formData, {
            onSuccess: ({ error, attribute, image }) => {
              const { style: tag, material, color } = attribute;
              const { gender, mainCategory, subCategory } = attribute;
              const nameArr = [gender, mainCategory, subCategory];
              const images = imageList(image);
              const categoryIds = getCategoryIds(categoryData, nameArr);
              setImgResult(error ? 'error' : 'success');
              imgUpload(images);
              if (!error) {
                updateArr(categoryIds, 'basicInfo', 'category');
                updateArr(color, 'style', 'color');
                onChange(tag, 'style', 'tag');
                onChange(material, 'style', 'material');
              }
            },
          });
        }
      }
    },
    [mutate, categoryData, imgUpload, updateArr, onChange],
  );

  const props = {
    isLoading,
    isImgValid,
    uploadRef,
    inputRef,
    state,
    imgResult,
    onUploadClick,
    onUploadImg,
    remove: removeImg,
  };

  return <ImgUploadView {...props} />;
}

export default memo(ImgUpload);
