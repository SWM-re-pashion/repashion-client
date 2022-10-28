import { useState } from 'react';

import { toastError } from 'src/utils/toaster';

type Props = {
  file: File | null;
  preview: FileReader['result'] | null;
};

export function useImgPreview(): [Props, (e: React.ChangeEvent) => void] {
  const [image, setImage] = useState<Props>({
    file: null,
    preview: null,
  });

  const saveImage = (e: React.ChangeEvent) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.type === 'change' && 'files' in e.target) {
      const {
        target: { files },
      } = e;
      if (files[0]) {
        fileReader.readAsDataURL(files[0]);
      }
      const filesArr: File[] = Array.from(files);
      if (filesArr.length > 1) {
        filesArr.splice(1);
        toastError({ message: '이미지는 1개만 올릴 수 있습니다.' });
      }
      fileReader.onload = () => {
        setImage({
          file: filesArr[0],
          preview: fileReader.result,
        });
      };
    }
  };
  return [image, saveImage];
}
