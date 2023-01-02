import { ChangeEvent, RefObject } from 'react';

import { Camera } from '@atoms/icon/Camera';
import InputFile from '@atoms/InputFile';
import InputLabel from '@atoms/InputLabel';
import ProfileImg from '@atoms/ProfileImg';

import $ from './style.module.scss';

type Props = {
  img: string;
  inputRef: RefObject<HTMLInputElement>;
  onUploadClick: () => void;
  handleUpload: (e: ChangeEvent) => void;
};

function ProfileImgUpload(uploadProps: Props) {
  const { img, inputRef, onUploadClick, handleUpload } = uploadProps;
  return (
    <div
      role="button"
      tabIndex={0}
      className={$['profile-img']}
      onClick={onUploadClick}
      onKeyDown={onUploadClick}
    >
      <ProfileImg
        width={180}
        height={180}
        src={img}
        alt="업로드할 내 프로필 사진"
      />
      <div className={$['camera-btn']}>
        <Camera />
      </div>

      <InputLabel htmlFor="chooseFile" text="프로필 이미지 업로드" />
      <InputFile
        ref={inputRef}
        id="chooseFile"
        accept=".jpg,.jpeg,.png,.webp,.heif,.heic,.bmp"
        onChange={handleUpload}
        none
        isMultiple={false}
      />
    </div>
  );
}

export default ProfileImgUpload;
