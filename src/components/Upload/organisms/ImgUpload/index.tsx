import { memo, useCallback, useEffect, useRef, useState } from 'react';

import { recognitionResult, UploadTemplateProps } from '#types/upload';
import { getCategoryIds } from 'src/api/category';
import { useImgUpload } from 'src/hooks/api/upload';
import useSwiper from 'src/hooks/useSwiper';
import { useUploadUpdateStore } from 'src/hooks/useUploadUpdateStore';

import ImgUploadView from './ImgUploadView';
import { getFormData, imageList } from './utils';
import { imgListValidate } from './validate';

type Props = {
  categoryData: res.CategoryTree['data'];
} & UploadTemplateProps;

function ImgUpload(imgProps: Props) {
  const { isUpdate, categoryData } = imgProps;
  const useStore = useUploadUpdateStore(isUpdate);
  const imgList = useStore((states) => states.imgList);
  const onChange = useStore((states) => states.updateUpload);
  const updateArr = useStore((states) => states.updateArr);
  const imgUpload = useStore((states) => states.imgUpload);
  const removeImg = useStore((states) => states.removeImg);
  const updateValidate = useStore((states) => states.updateValidate);
  const [imgResult, setImgResult] = useState<recognitionResult>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadRef = useRef<HTMLDivElement>(null);
  const { isLoading, mutate } = useImgUpload();
  const isImgValid = imgListValidate(imgList);

  useSwiper(uploadRef);
  useEffect(() => {
    updateValidate('imgList', isImgValid);
  }, [isImgValid, updateValidate]);

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
