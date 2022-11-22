import { toastSuccess, toastError } from 'src/utils/toaster';

type onCopyFn = (text: string) => void;

function copyClipBoard(): onCopyFn {
  return async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toastSuccess({ message: '클립보드에 복사되었습니다.' });
    } catch (error) {
      toastError({ message: '클립보드 복사에 실패했습니다.' });
    }
  };
}

export default copyClipBoard;
