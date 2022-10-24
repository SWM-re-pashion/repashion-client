import React, { memo } from 'react';

import { ImgList } from '#types/storeType/upload';
import ErrorMsg from '@atoms/ErrorMsg';
import Loading from '@atoms/Loading';
import classnames from 'classnames';
import ImgCard from 'src/components/Upload/molecules/ImgCard';
import ImgUploadBtn from 'src/components/Upload/molecules/ImgUploadBtn';

import ImgResultModal, { ImgResult } from '../ImgResultModal';
import $ from './style.module.scss';

type Props = {
  isLoading: boolean;
  uploadRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  state: ImgList[];
  imgResult: ImgResult;
  onUploadClick: () => void;
  onUploadImg: (e: React.ChangeEvent) => void;
  remove: (removeId: number) => void;
  isImgValid: boolean;
};

function ImgUploadView(viewProps: Props) {
  const { onUploadClick, onUploadImg, remove, imgResult } = viewProps;
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
      <ImgResultModal resultType={imgResult} {...{ isLoading }} />
    </article>
  );
}

export default memo(ImgUploadView);