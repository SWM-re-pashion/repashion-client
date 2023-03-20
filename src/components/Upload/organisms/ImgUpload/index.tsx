import { memo, useCallback, useRef, useState } from 'react';

import { UpdateUpload } from '#types/storeType/upload';
import { recognitionResult } from '#types/upload';
import { getCategoryIds } from 'src/api/category';
import { useImgUpload } from 'src/hooks/api/upload';
import useSwiper from 'src/hooks/useSwiper';
import { useUploadStore } from 'src/store/upload/useUploadStore';

import ImgUploadView from './ImgUploadView';
import { getFormData, imageList } from './utils';

type Props = {
  isImgValid: boolean;
  categoryData: res.CategoryTree['data'];
  onChange: UpdateUpload;
};

function ImgUpload(imgProps: Props) {
  const { onChange } = imgProps;
  const { isImgValid, categoryData } = imgProps;
  const imgList = useUploadStore((states) => states.imgList);
  const updateArr = useUploadStore((states) => states.updateArr);
  const imgUpload = useUploadStore((states) => states.imgUpload);
  const removeImg = useUploadStore((states) => states.removeImg);
  const [imgResult, setImgResult] = useState<recognitionResult>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadRef = useRef<HTMLDivElement>(null);
  const { isLoading, mutate } = useImgUpload();
  useSwiper(uploadRef);

  const onUploadClick = useCallback(() => {
    if (inputRef.current) inputRef.current.click();
  }, []);

  const onUploadImg = useCallback(
    (e: React.ChangeEvent) => {
      const formData = getFormData(e);
      if (formData) {
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
    },
    [mutate, categoryData, imgUpload, updateArr, onChange],
  );

  const props = {
    isLoading,
    isImgValid,
    uploadRef,
    inputRef,
    state: imgList,
    imgResult,
    onUploadClick,
    onUploadImg,
    remove: removeImg,
  };

  return <ImgUploadView {...props} />;
}

export default memo(ImgUpload);
