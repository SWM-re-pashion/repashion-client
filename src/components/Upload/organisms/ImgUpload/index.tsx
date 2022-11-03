import React, { memo, useCallback, useRef, useState } from 'react';

import {
  ImgList,
  UpdateArr,
  UpdateUpload,
  UploadStoreState,
} from '#types/storeType/upload';
import { getCategoryIds } from 'src/api/category';
import { useImgUpload } from 'src/hooks/api/upload';
import useDragScroll from 'src/hooks/useDragScroll';
import { toastError } from 'src/utils/toaster';

import { recognitionResult } from '../ImgResultModal';
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
  const [imgResult, setImgResult] = useState<recognitionResult>({});
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
              const images = imageList(image);
              if (image.length) imgUpload(images);
              if (error) {
                if (image.length) setImgResult({ state: 'failed' });
                else setImgResult({ state: 'error' });
                return;
              }
              const { style: tag, material, color } = attribute;
              const { gender, mainCategory, subCategory } = attribute;
              const nameArr = [gender, mainCategory, subCategory];
              const category = `${gender} > ${mainCategory} > ${subCategory}`;
              const categoryIds = getCategoryIds(categoryData, nameArr);
              setImgResult({
                state: 'success',
                category,
                tag,
                color: color.join(', '),
                material,
              });
              updateArr(categoryIds, 'basicInfo', 'category');
              updateArr(color, 'style', 'color');
              onChange(tag, 'style', 'tag');
              onChange(material, 'style', 'material');
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
