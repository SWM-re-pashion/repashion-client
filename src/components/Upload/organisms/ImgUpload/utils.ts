import { toastError } from 'src/utils/toaster';

export const imageList = (imgList: string[]) =>
  imgList.map((img, idx) => {
    return {
      id: idx + 1,
      src: img,
    };
  });

export const getFormData = (e: React.ChangeEvent) => {
  if (e.type === 'change' && 'files' in e.target) {
    const formData = new FormData();
    const {
      target: { files },
    } = e;
    if (files) {
      const filesArr: File[] = Array.from(files);
      if (filesArr.length > 10) {
        filesArr.splice(10);
        toastError({ message: '이미지는 최대 10개까지 올릴 수 있습니다.' });
      }
      filesArr.forEach((file: File) => {
        formData.append('files', file);
      });
      return formData;
    }
  }
  return null;
};
