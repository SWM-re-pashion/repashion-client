import React, { memo } from 'react';

import { ImgList } from '#types/storeType/upload';
import ErrorMsg from '@atoms/ErrorMsg';
import Loading from '@atoms/Loading';
import classnames from 'classnames';
import ImgCard from 'components/Upload/molecules/ImgCard';
import ImgUploadBtn from 'components/Upload/molecules/ImgUploadBtn';

import $ from './style.module.scss';

type Props = {
  isLoading: boolean;
  uploadRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  state: ImgList[];
  onUploadClick: () => void;
  onUploadImg: (e: React.ChangeEvent) => void;
  remove: (removeId: number) => void;
  isImgValid: boolean;
};

function ImgUploadView(viewProps: Props) {
  const { onUploadClick, onUploadImg, remove } = viewProps;
  const { uploadRef, inputRef, isLoading, isImgValid, state } = viewProps;

  return (
    <article
      className={classnames($['upload-container'], {
        [$['upload-container-loading']]: isLoading,
      })}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className={$['img-upload']} ref={uploadRef}>
            <ImgUploadBtn
              {...{ inputRef, onUploadClick }}
              num={state.length}
              onUpload={onUploadImg}
            />
            {state.map(({ id, src }, idx) => (
              <ImgCard key={id + src} first={!idx} {...{ id, src, remove }} />
            ))}
          </div>
          <ErrorMsg
            isValid={isImgValid}
            msg="이미지를 1 ~ 10개 사이로 올려주세요."
          />
        </>
      )}
    </article>
  );
}

export default memo(ImgUploadView);
