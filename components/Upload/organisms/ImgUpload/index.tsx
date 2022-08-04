import React, { useCallback, useRef } from 'react';

import ImgUploadBtn from 'components/Upload/molecules/ImgUploadBtn';

import $ from './style.module.scss';

type Props = {
  //   data: styleSelectBox[];
};

function ImgUpload(imgProps: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onUploadClick = useCallback(() => {
    if (inputRef.current) inputRef.current.click();
  }, []);

  const onUploadImg = useCallback((e: React.ChangeEvent) => {
    if (e.type === 'change' && 'files' in e.target) {
      const {
        target: { files },
      } = e;
      if (files) console.log(files);
    }
  }, []);

  return (
    <article className={$['img-upload']}>
      <ImgUploadBtn
        {...{ inputRef, onUploadClick }}
        num={1}
        onUpload={onUploadImg}
      />
    </article>
  );
}

export default ImgUpload;
