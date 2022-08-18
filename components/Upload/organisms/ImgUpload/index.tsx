import React, { memo, useCallback, useRef } from 'react';

import { ImgBasicProps } from '#types/index';
import { UploadState } from '#types/storeType/upload';
import { useImgUpload } from 'api/upload';
import ImgCard from 'components/Upload/molecules/ImgCard';
import ImgUploadBtn from 'components/Upload/molecules/ImgUploadBtn';
import useDragScroll from 'hooks/useDragScroll';

import $ from './style.module.scss';

type Props = {
  state: UploadState['imgList'];
  dispatch: (imgList: ({ id: number } & ImgBasicProps)[]) => void;
  remove: (removeId: number) => void;
};

const MOCK_IMG =
  'https://images.unsplash.com/photo-1618588507085-c79565432917?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmVhdXRpZnVsJTIwbmF0dXJlfGVufDB8fDB8fA%3D%3D&w=1000&q=80';

function ImgUpload(imgProps: Props) {
  const { dispatch, state, remove } = imgProps;
  const idRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadRef = useRef<HTMLDivElement>(null);
  const { mutate } = useImgUpload();
  useDragScroll(uploadRef);

  const onUploadClick = useCallback(() => {
    if (inputRef.current) inputRef.current.click();
  }, []);

  const onUploadImg = useCallback(
    (e: React.ChangeEvent) => {
      if (e.type === 'change' && 'files' in e.target) {
        const {
          target: { files },
        } = e;
        if (files) {
          mutate(files);
          // dispatch([...state, { id: (idRef.current += 1), src: MOCK_IMG }]);
        }
      }
    },
    [state, dispatch],
  );

  return (
    <article className={$['img-upload']} ref={uploadRef}>
      <ImgUploadBtn
        {...{ inputRef, onUploadClick }}
        num={state.length}
        onUpload={onUploadImg}
      />
      {state.map(({ id, src }, idx) => (
        <ImgCard key={id + src} first={!idx} {...{ id, src, remove }} />
      ))}
    </article>
  );
}

export default memo(ImgUpload);
