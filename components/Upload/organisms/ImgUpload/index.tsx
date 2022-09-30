import React, { memo, useCallback, useRef } from 'react';

import { ImgBasicProps } from '#types/index';
import { ImgList, UpdateUpload } from '#types/storeType/upload';
import { useImgUpload } from 'api/upload';
import useDragScroll from 'hooks/useDragScroll';

import ImgUploadView from './ImgUploadView';

type Props = {
  state: ImgList[];
  dispatch: (imgList: ({ id: number } & ImgBasicProps)[]) => void;
  remove: (removeId: number) => void;
  onChange: UpdateUpload;
  isImgValid: boolean;
};

function ImgUpload(imgProps: Props) {
  const { dispatch, state, remove, onChange, isImgValid } = imgProps;
  const idRef = useRef(0);
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
          } // TODO: 이미지 10개 제한, 팝업 메시지
          filesArr.forEach((file: File) => {
            formData.append('files', file);
          });
          mutate(formData, {
            onSuccess: ({ attribute, image }: res.ImgUpload) => {
              const { style: tag, material } = attribute;
              const images = image.map((img) => {
                idRef.current += 1;
                return {
                  id: idRef.current,
                  src: img,
                };
              });
              console.log(attribute);
              dispatch(images);
              onChange(tag, 'style', 'tag');
              onChange(material, 'style', 'material');
            },
          });
        }
      }
    },
    [mutate, dispatch, onChange],
  );

  const props = {
    isLoading,
    isImgValid,
    uploadRef,
    inputRef,
    state,
    onUploadClick,
    onUploadImg,
    remove,
  };

  return <ImgUploadView {...props} />;
}

export default memo(ImgUpload);
