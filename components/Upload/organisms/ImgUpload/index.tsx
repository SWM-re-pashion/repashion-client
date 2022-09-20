import React, { memo, useCallback, useRef } from 'react';

import { ImgBasicProps } from '#types/index';
import { UpdateUpload, UploadState } from '#types/storeType/upload';
import LoadingSpinner from '@atoms/LoadingSpinner';
import { useImgUpload } from 'api/upload';
import classnames from 'classnames';
import ImgCard from 'components/Upload/molecules/ImgCard';
import ImgUploadBtn from 'components/Upload/molecules/ImgUploadBtn';
import useDragScroll from 'hooks/useDragScroll';

import $ from './style.module.scss';

type Props = {
  state: UploadState;
  dispatch: (imgList: ({ id: number } & ImgBasicProps)[]) => void;
  remove: (removeId: number) => void;
  onChange: UpdateUpload;
};

function ImgUpload(imgProps: Props) {
  const { dispatch, state, remove, onChange } = imgProps;
  const { imgList } = state;
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

  return (
    <article
      className={classnames($['img-upload'], {
        [$['img-upload-loading']]: isLoading,
      })}
      ref={uploadRef}
    >
      {isLoading ? (
        <LoadingSpinner width={50} borderWidth={3} color="#876bf6" />
      ) : (
        <>
          <ImgUploadBtn
            {...{ inputRef, onUploadClick }}
            num={imgList.length}
            onUpload={onUploadImg}
          />
          {imgList.map(
            (
              { id, src },
              idx, // TODO: imgList margin-top 주기
            ) => (
              <ImgCard key={id + src} first={!idx} {...{ id, src, remove }} />
            ),
          )}
        </>
      )}
    </article>
  );
}

export default memo(ImgUpload);
