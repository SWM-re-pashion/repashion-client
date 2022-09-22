import Button from '@atoms/Button';
import { Upload } from '@atoms/icon';
import InputFile from '@atoms/InputFile';
import InputLabel from '@atoms/InputLabel';

import $ from './style.module.scss';

type Props = {
  inputRef: React.RefObject<HTMLInputElement>;
  num: number;
  onUploadClick: () => void;
  onUpload: (e: React.ChangeEvent) => void;
};

function ImgUploadBtn(imgProps: Props) {
  const { inputRef, num, onUploadClick, onUpload } = imgProps;

  return (
    <Button
      iconBtn
      className={$['img-upload']}
      onClick={onUploadClick}
      aria-label="이미지 업로드 버튼"
    >
      <Upload />
      <span className={$['img-num']}>
        (<span className={$.num}>{num}</span>
        /10)
      </span>
      <InputLabel htmlFor="chooseFile" text="이미지 업로드" />
      <InputFile
        ref={inputRef}
        id="chooseFile"
        isMultiple
        accept=".jpg,.jpeg,.png,.webp,.heif,.heic,.bmp"
        onChange={onUpload}
        none
      />
    </Button>
  );
}

export default ImgUploadBtn;
